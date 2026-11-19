const Customer = require('../models/Customer');
const Product = require('../models/Product');
const Relationship = require('../models/Relationship');

/**
 * Knowledge Graph Recommendation Engine
 * Performs rule-based graph traversal, candidate scoring, and reasoning path generation.
 *
 * Scoring Rules:
 *  - Rule 1 (+5 pts): HAS_ACCESSORY of a previously PURCHASED product
 *  - Rule 2 (+4 pts): RELATED_TO a previously PURCHASED product
 *  - Rule 3 (+3 pts): Associated with a customer's INTERESTED_IN interest
 *  - Rule 4 (+2 pts): BELONGS_TO a customer's PREFERS category
 *
 * Constraints:
 *  - Excludes products already PURCHASED by this customer.
 *  - Combines scores for multi-path synergies.
 *  - Deterministic sorting: totalScore DESC, name ASC.
 */
class RecommendationService {
  /**
   * Generate recommendations for a specific customer
   * @param {string} customerId 
   * @param {object} customWeights Optional weight overrides
   */
  async generateRecommendations(customerId, customWeights = {}) {
    const weights = {
      accessory: customWeights.accessory !== undefined ? Number(customWeights.accessory) : 5,
      related: customWeights.related !== undefined ? Number(customWeights.related) : 4,
      interest: customWeights.interest !== undefined ? Number(customWeights.interest) : 3,
      category: customWeights.category !== undefined ? Number(customWeights.category) : 2
    };

    // 1. Fetch customer with populated purchase history
    const customer = await Customer.findById(customerId).populate('purchaseHistory.product');
    if (!customer) {
      throw new Error(`Customer with ID ${customerId} not found.`);
    }

    // Determine purchased product IDs to strictly exclude from recommendations
    const purchasedProductIds = new Set(
      customer.purchaseHistory
        .filter(p => p.product)
        .map(p => (p.product._id ? p.product._id.toString() : p.product.toString()))
    );

    // Also get product details for purchased items
    const purchasedProductsMap = new Map();
    customer.purchaseHistory.forEach(p => {
      if (p.product && p.product._id) {
        purchasedProductsMap.set(p.product._id.toString(), p.product);
      }
    });

    // 2. Fetch all products from catalog
    const allProducts = await Product.find({ inStock: true });
    const productMap = new Map(allProducts.map(p => [p._id.toString(), p]));

    // 3. Fetch all graph relationships relevant to this customer's context
    // This includes:
    //  - HAS_ACCESSORY edges where fromId is in purchasedProductIds
    //  - RELATED_TO edges where fromId or toId is in purchasedProductIds
    //  - MATCHES_INTEREST edges for customer's interests
    //  - BELONGS_TO edges for customer's preferred categories
    const candidateScores = new Map(); // productId -> CandidateEvaluation

    const initCandidate = (productId) => {
      if (!candidateScores.has(productId)) {
        candidateScores.set(productId, {
          productId,
          product: productMap.get(productId),
          totalScore: 0,
          scoreBreakdown: [],
          reasoningPaths: [],
          matchedInterests: new Set(),
          matchedCategories: new Set(),
          originatingPurchases: new Set()
        });
      }
      return candidateScores.get(productId);
    };

    // -------------------------------------------------------------
    // PATH 1 & 2: Traversing from previously PURCHASED products
    // (Customer) -[PURCHASED]-> (Product A) -[HAS_ACCESSORY]-> (Candidate)
    // (Customer) -[PURCHASED]-> (Product A) -[RELATED_TO]-> (Candidate)
    // -------------------------------------------------------------
    if (purchasedProductIds.size > 0) {
      const purchasedIdsArray = Array.from(purchasedProductIds);

      // Find all accessories and related relationships stemming from purchased products
      const productRelationships = await Relationship.find({
        fromId: { $in: purchasedIdsArray },
        relationshipType: { $in: ['HAS_ACCESSORY', 'RELATED_TO'] }
      });

      for (const rel of productRelationships) {
        const candidateId = rel.toId;

        // Skip if candidate is already purchased or not in current active catalog
        if (purchasedProductIds.has(candidateId) || !productMap.has(candidateId)) {
          continue;
        }

        const candidate = initCandidate(candidateId);
        const originatingProd = productMap.get(rel.fromId) || { name: rel.fromName };

        if (rel.relationshipType === 'HAS_ACCESSORY') {
          const points = weights.accessory;
          candidate.totalScore += points;
          candidate.scoreBreakdown.push({
            rule: 'HAS_ACCESSORY',
            points,
            description: `Official accessory for previously purchased "${originatingProd.name}"`,
            path: `Customer (${customer.name}) → PURCHASED → ${originatingProd.name} → HAS_ACCESSORY → ${candidate.product.name}`
          });
          candidate.reasoningPaths.push(
            `Customer (${customer.name}) → PURCHASED → ${originatingProd.name} → HAS_ACCESSORY → ${candidate.product.name}`
          );
          candidate.originatingPurchases.add(originatingProd.name);
        } else if (rel.relationshipType === 'RELATED_TO') {
          const points = weights.related;
          candidate.totalScore += points;
          candidate.scoreBreakdown.push({
            rule: 'RELATED_TO',
            points,
            description: `Complementary related item to previously purchased "${originatingProd.name}"`,
            path: `Customer (${customer.name}) → PURCHASED → ${originatingProd.name} → RELATED_TO → ${candidate.product.name}`
          });
          candidate.reasoningPaths.push(
            `Customer (${customer.name}) → PURCHASED → ${originatingProd.name} → RELATED_TO → ${candidate.product.name}`
          );
          candidate.originatingPurchases.add(originatingProd.name);
        }
      }
    }

    // -------------------------------------------------------------
    // PATH 3: Traversing from customer's INTERESTS
    // (Customer) -[INTERESTED_IN]-> (Interest) <-[MATCHES_INTEREST]- (Candidate)
    // -------------------------------------------------------------
    if (customer.interests && customer.interests.length > 0) {
      for (const prod of allProducts) {
        const candidateId = prod._id.toString();
        if (purchasedProductIds.has(candidateId)) continue;

        if (prod.matchingInterests && prod.matchingInterests.length > 0) {
          for (const customerInterest of customer.interests) {
            if (prod.matchingInterests.includes(customerInterest)) {
              const candidate = initCandidate(candidateId);
              const points = weights.interest;
              candidate.totalScore += points;
              candidate.matchedInterests.add(customerInterest);
              candidate.scoreBreakdown.push({
                rule: 'INTERESTED_IN',
                points,
                description: `Matches customer's interest in "${customerInterest}"`,
                path: `Customer (${customer.name}) → INTERESTED_IN → [${customerInterest}] ← MATCHES_INTEREST ← ${prod.name}`
              });
              candidate.reasoningPaths.push(
                `Customer (${customer.name}) → INTERESTED_IN → [${customerInterest}] ← MATCHES_INTEREST ← ${prod.name}`
              );
            }
          }
        }
      }
    }

    // -------------------------------------------------------------
    // PATH 4: Traversing from customer's PREFERRED CATEGORIES
    // (Customer) -[PREFERS]-> (Category) <-[BELONGS_TO]- (Candidate)
    // -------------------------------------------------------------
    if (customer.preferredCategories && customer.preferredCategories.length > 0) {
      for (const prod of allProducts) {
        const candidateId = prod._id.toString();
        if (purchasedProductIds.has(candidateId)) continue;

        if (customer.preferredCategories.includes(prod.category)) {
          const candidate = initCandidate(candidateId);
          const points = weights.category;
          candidate.totalScore += points;
          candidate.matchedCategories.add(prod.category);
          candidate.scoreBreakdown.push({
            rule: 'PREFERS_CATEGORY',
            points,
            description: `Belongs to customer's preferred category "${prod.category}"`,
            path: `Customer (${customer.name}) → PREFERS → {${prod.category}} ← BELONGS_TO ← ${prod.name}`
          });
          candidate.reasoningPaths.push(
            `Customer (${customer.name}) → PREFERS → {${prod.category}} ← BELONGS_TO ← ${prod.name}`
          );
        }
      }
    }

    // 4. Format, serialize Sets to Arrays, and Sort Candidates deterministically
    const rankedRecommendations = Array.from(candidateScores.values())
      .filter(item => item.totalScore > 0 && item.product)
      .map((item, index) => ({
        rank: index + 1,
        product: item.product,
        totalScore: item.totalScore,
        scoreBreakdown: item.scoreBreakdown,
        reasoningPaths: item.reasoningPaths,
        matchedInterests: Array.from(item.matchedInterests),
        matchedCategories: Array.from(item.matchedCategories),
        originatingPurchases: Array.from(item.originatingPurchases),
        summaryReason: this.generateSummaryReason(item)
      }))
      .sort((a, b) => {
        // Deterministic sort: totalScore DESC, then product.name ASC
        if (b.totalScore !== a.totalScore) {
          return b.totalScore - a.totalScore;
        }
        return a.product.name.localeCompare(b.product.name);
      })
      .map((item, idx) => ({ ...item, rank: idx + 1 }));

    return {
      customer: {
        id: customer._id,
        name: customer.name,
        role: customer.role,
        avatar: customer.avatar,
        interests: customer.interests,
        preferredCategories: customer.preferredCategories,
        purchasedProductsCount: customer.purchaseHistory.length,
        purchasedProducts: customer.purchaseHistory.map(p => ({
          id: p.product?._id,
          name: p.productName || p.product?.name,
          price: p.price,
          purchaseDate: p.purchaseDate
        }))
      },
      weightsUsed: weights,
      totalRecommendations: rankedRecommendations.length,
      recommendations: rankedRecommendations
    };
  }

  /**
   * Helper to craft a concise, readable summary of why this product is recommended
   */
  generateSummaryReason(item) {
    const reasons = [];
    if (item.originatingPurchases.size > 0) {
      reasons.push(`Accessory/Related to purchased "${Array.from(item.originatingPurchases).join(', ')}"`);
    }
    if (item.matchedInterests.size > 0) {
      reasons.push(`Matches interests in ${Array.from(item.matchedInterests).join(', ')}`);
    }
    if (item.matchedCategories.size > 0) {
      reasons.push(`In preferred category ${Array.from(item.matchedCategories).join(', ')}`);
    }
    return reasons.join(' • ');
  }
}

module.exports = new RecommendationService();
