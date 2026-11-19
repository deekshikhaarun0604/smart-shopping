const Customer = require('../models/Customer');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Interest = require('../models/Interest');
const Relationship = require('../models/Relationship');

/**
 * Knowledge Graph Service
 * Translates semantic database entities and relationships into React Flow nodes and edges.
 */
class GraphService {
  /**
   * Fetch graph data with optional filtering
   * @param {Object} options { customerId, productId, entityType, limit }
   */
  async getGraphData(options = {}) {
    const { customerId, productId, entityType } = options;

    // Fetch all entities
    const [customers, products, categories, interests, allRelationships] = await Promise.all([
      Customer.find({}).lean(),
      Product.find({}).lean(),
      Category.find({}).lean(),
      Interest.find({}).lean(),
      Relationship.find({}).lean()
    ]);

    let filteredRelationships = allRelationships;
    let relevantNodeIds = new Set();

    if (customerId) {
      // Focus on customer subgraph: 1-hop and 2-hop
      relevantNodeIds.add(customerId);

      // 1-hop edges from customer
      const hop1Edges = allRelationships.filter(
        rel => rel.fromId === customerId || rel.toId === customerId
      );
      hop1Edges.forEach(rel => {
        relevantNodeIds.add(rel.fromId);
        relevantNodeIds.add(rel.toId);
      });

      // 2-hop edges (e.g. from purchased products to accessories, or from interests to matching products)
      const hop2Edges = allRelationships.filter(rel =>
        relevantNodeIds.has(rel.fromId) &&
        (rel.relationshipType === 'HAS_ACCESSORY' ||
         rel.relationshipType === 'RELATED_TO' ||
         rel.relationshipType === 'MATCHES_INTEREST')
      );
      hop2Edges.forEach(rel => {
        relevantNodeIds.add(rel.fromId);
        relevantNodeIds.add(rel.toId);
      });

      filteredRelationships = allRelationships.filter(
        rel => relevantNodeIds.has(rel.fromId) && relevantNodeIds.has(rel.toId)
      );
    } else if (productId) {
      // Focus on product subgraph
      relevantNodeIds.add(productId);
      const connectedEdges = allRelationships.filter(
        rel => rel.fromId === productId || rel.toId === productId
      );
      connectedEdges.forEach(rel => {
        relevantNodeIds.add(rel.fromId);
        relevantNodeIds.add(rel.toId);
      });
      filteredRelationships = connectedEdges;
    } else if (entityType) {
      // Filter by type
      filteredRelationships = allRelationships.filter(
        rel => rel.fromType === entityType || rel.toType === entityType
      );
      filteredRelationships.forEach(rel => {
        relevantNodeIds.add(rel.fromId);
        relevantNodeIds.add(rel.toId);
      });
    }

    // Build React Flow Nodes
    const nodes = [];
    const entityCountByType = {
      Customer: 0,
      Product: 0,
      Category: 0,
      Interest: 0
    };

    // Layout configuration coordinates
    let cIdx = 0, pIdx = 0, catIdx = 0, intIdx = 0;

    // 1. Customer Nodes (Left column: x = 50)
    customers.forEach((c) => {
      const id = c._id.toString();
      if (relevantNodeIds.size === 0 || relevantNodeIds.has(id)) {
        entityCountByType.Customer++;
        nodes.push({
          id,
          type: 'customerNode',
          position: { x: 60, y: 80 + cIdx * 140 },
          data: {
            id,
            name: c.name,
            role: c.role,
            avatar: c.avatar,
            entityType: 'Customer',
            email: c.email,
            interests: c.interests,
            preferredCategories: c.preferredCategories,
            purchaseCount: c.purchaseHistory ? c.purchaseHistory.length : 0
          }
        });
        cIdx++;
      }
    });

    // 2. Category Nodes (Top Middle: x = 500, y = top row)
    categories.forEach((cat) => {
      const id = cat._id.toString();
      if (relevantNodeIds.size === 0 || relevantNodeIds.has(id)) {
        entityCountByType.Category++;
        nodes.push({
          id,
          type: 'categoryNode',
          position: { x: 520 + (catIdx % 3) * 260, y: 60 + Math.floor(catIdx / 3) * 160 },
          data: {
            id,
            name: cat.name,
            slug: cat.slug,
            description: cat.description,
            icon: cat.icon,
            color: cat.color,
            entityType: 'Category'
          }
        });
        catIdx++;
      }
    });

    // 3. Interest Nodes (Bottom Middle: x = 520, y = bottom row)
    interests.forEach((item) => {
      const id = item._id.toString();
      if (relevantNodeIds.size === 0 || relevantNodeIds.has(id)) {
        entityCountByType.Interest++;
        nodes.push({
          id,
          type: 'interestNode',
          position: { x: 500 + (intIdx % 4) * 220, y: 460 + Math.floor(intIdx / 4) * 140 },
          data: {
            id,
            name: item.name,
            slug: item.slug,
            description: item.description,
            color: item.color,
            categoryHint: item.categoryHint,
            entityType: 'Interest'
          }
        });
        intIdx++;
      }
    });

    // 4. Product Nodes (Right area: x = 1400)
    products.forEach((prod) => {
      const id = prod._id.toString();
      if (relevantNodeIds.size === 0 || relevantNodeIds.has(id)) {
        entityCountByType.Product++;
        const row = Math.floor(pIdx / 3);
        const col = pIdx % 3;
        nodes.push({
          id,
          type: 'productNode',
          position: { x: 1450 + col * 260, y: 70 + row * 150 },
          data: {
            id,
            name: prod.name,
            slug: prod.slug,
            category: prod.category,
            price: prod.price,
            rating: prod.rating,
            image: prod.image,
            badge: prod.badge,
            entityType: 'Product'
          }
        });
        pIdx++;
      }
    });

    // Map React Flow Edges with distinct visual colors & labels
    const edgeColors = {
      PURCHASED: '#10b981',       // Emerald Green
      HAS_ACCESSORY: '#6366f1',   // Indigo
      RELATED_TO: '#8b5cf6',      // Purple
      INTERESTED_IN: '#f59e0b',   // Amber
      PREFERS: '#06b6d4',         // Cyan
      BELONGS_TO: '#64748b',      // Slate
      MATCHES_INTEREST: '#ec4899' // Pink
    };

    const edges = filteredRelationships.map((rel, index) => {
      const color = edgeColors[rel.relationshipType] || '#94a3b8';
      const isAccessoryOrRelated = rel.relationshipType === 'HAS_ACCESSORY' || rel.relationshipType === 'RELATED_TO';

      return {
        id: `edge-${rel._id || index}-${rel.fromId}-${rel.toId}`,
        source: rel.fromId,
        target: rel.toId,
        label: rel.relationshipType,
        type: 'smoothstep',
        animated: isAccessoryOrRelated || rel.relationshipType === 'PURCHASED',
        style: {
          stroke: color,
          strokeWidth: isAccessoryOrRelated ? 2.5 : 1.8
        },
        labelStyle: {
          fill: color,
          fontWeight: 700,
          fontSize: 10,
          letterSpacing: '0.05em'
        },
        labelBgStyle: {
          fill: '#ffffff',
          fillOpacity: 0.95,
          rx: 4,
          ry: 4
        },
        data: {
          relationshipType: rel.relationshipType,
          description: rel.description,
          weight: rel.weight,
          fromName: rel.fromName,
          toName: rel.toName
        }
      };
    });

    return {
      nodes,
      edges,
      stats: {
        totalNodes: nodes.length,
        totalEdges: edges.length,
        entityCounts: entityCountByType,
        isFocused: Boolean(customerId || productId || entityType),
        focusedCustomerId: customerId || null
      }
    };
  }
}

module.exports = new GraphService();
