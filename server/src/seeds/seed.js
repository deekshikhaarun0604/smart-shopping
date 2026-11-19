require('dotenv').config({ path: __dirname + '/../../.env' });
const mongoose = require('mongoose');
const { connectDB } = require('../config/db');

const Category = require('../models/Category');
const Interest = require('../models/Interest');
const Product = require('../models/Product');
const Customer = require('../models/Customer');
const Relationship = require('../models/Relationship');
const Purchase = require('../models/Purchase');

const seedData = require('./seedData');

const seedDatabase = async () => {
  console.log('[Seed] Starting database population...');
  
  const connected = await connectDB();
  if (!connected) {
    console.error('[Seed Error] Could not connect to MongoDB. Aborting seed.');
    return { success: false, message: 'Could not connect to MongoDB. Start MongoDB with `mongod` and try again.' };
  }

  try {
    // Clear existing collections
    console.log('[Seed] Clearing existing collections...');
    await Promise.all([
      Category.deleteMany({}),
      Interest.deleteMany({}),
      Product.deleteMany({}),
      Customer.deleteMany({}),
      Relationship.deleteMany({}),
      Purchase.deleteMany({})
    ]);

    // 1. Seed Categories
    console.log('[Seed] Inserting Categories...');
    const insertedCategories = await Category.insertMany(seedData.categories);
    const categoryMap = new Map();
    insertedCategories.forEach(c => categoryMap.set(c.name, c));

    // 2. Seed Interests
    console.log('[Seed] Inserting Interests...');
    const insertedInterests = await Interest.insertMany(seedData.interests);
    const interestMap = new Map();
    insertedInterests.forEach(i => interestMap.set(i.name, i));

    // 3. Seed Products
    console.log('[Seed] Inserting Products...');
    const insertedProducts = await Product.insertMany(seedData.products);
    const productSlugMap = new Map();
    insertedProducts.forEach(p => productSlugMap.set(p.slug, p));

    // 4. Seed Customers and Purchases
    console.log('[Seed] Inserting Customers & Initial Purchases...');
    const relationships = [];
    const insertedCustomers = [];

    for (const cData of seedData.customers) {
      const customerPurchases = [];
      
      // Look up purchased products
      for (const pSlug of cData.purchases) {
        const prod = productSlugMap.get(pSlug);
        if (prod) {
          customerPurchases.push({
            product: prod._id,
            productName: prod.name,
            price: prod.price,
            purchaseDate: new Date(Date.now() - Math.floor(Math.random() * 30 + 1) * 86400000)
          });
        }
      }

      const newCustomer = await Customer.create({
        name: cData.name,
        email: cData.email,
        avatar: cData.avatar,
        role: cData.role,
        bio: cData.bio,
        preferredCategories: cData.preferredCategories,
        interests: cData.interests,
        purchaseHistory: customerPurchases
      });
      insertedCustomers.push(newCustomer);

      // Create Purchase documents & PURCHASED relationships
      for (const pur of customerPurchases) {
        await Purchase.create({
          customer: newCustomer._id,
          product: pur.product,
          productName: pur.productName,
          customerName: newCustomer.name,
          price: pur.price,
          quantity: 1,
          totalAmount: pur.price,
          purchaseDate: pur.purchaseDate
        });

        relationships.push({
          fromId: newCustomer._id.toString(),
          fromType: 'Customer',
          fromName: newCustomer.name,
          toId: pur.product.toString(),
          toType: 'Product',
          toName: pur.productName,
          relationshipType: 'PURCHASED',
          weight: 5,
          description: `${newCustomer.name} purchased ${pur.productName}`
        });
      }

      // Customer PREFERS Category relationships
      for (const catName of newCustomer.preferredCategories) {
        const cat = categoryMap.get(catName);
        if (cat) {
          relationships.push({
            fromId: newCustomer._id.toString(),
            fromType: 'Customer',
            fromName: newCustomer.name,
            toId: cat._id.toString(),
            toType: 'Category',
            toName: cat.name,
            relationshipType: 'PREFERS',
            weight: 2,
            description: `${newCustomer.name} prefers category ${cat.name}`
          });
        }
      }

      // Customer INTERESTED_IN Interest relationships
      for (const intName of newCustomer.interests) {
        const intNode = interestMap.get(intName);
        if (intNode) {
          relationships.push({
            fromId: newCustomer._id.toString(),
            fromType: 'Customer',
            fromName: newCustomer.name,
            toId: intNode._id.toString(),
            toType: 'Interest',
            toName: intNode.name,
            relationshipType: 'INTERESTED_IN',
            weight: 3,
            description: `${newCustomer.name} is interested in ${intNode.name}`
          });
        }
      }
    }

    // 5. Product Relationships: BELONGS_TO Category
    console.log('[Seed] Linking Products to Categories...');
    for (const prod of insertedProducts) {
      const cat = categoryMap.get(prod.category);
      if (cat) {
        relationships.push({
          fromId: prod._id.toString(),
          fromType: 'Product',
          fromName: prod.name,
          toId: cat._id.toString(),
          toType: 'Category',
          toName: cat.name,
          relationshipType: 'BELONGS_TO',
          weight: 1,
          description: `${prod.name} belongs to ${cat.name}`
        });
      }

      // Product MATCHES_INTEREST Interest
      if (prod.matchingInterests && prod.matchingInterests.length > 0) {
        for (const intName of prod.matchingInterests) {
          const intNode = interestMap.get(intName);
          if (intNode) {
            relationships.push({
              fromId: prod._id.toString(),
              fromType: 'Product',
              fromName: prod.name,
              toId: intNode._id.toString(),
              toType: 'Interest',
              toName: intNode.name,
              relationshipType: 'MATCHES_INTEREST',
              weight: 3,
              description: `${prod.name} matches interest in ${intNode.name}`
            });
          }
        }
      }
    }

    // 6. Product HAS_ACCESSORY Product
    console.log('[Seed] Linking Product Accessories...');
    for (const acc of seedData.accessories) {
      const fromProd = productSlugMap.get(acc.from);
      const toProd = productSlugMap.get(acc.to);
      if (fromProd && toProd) {
        relationships.push({
          fromId: fromProd._id.toString(),
          fromType: 'Product',
          fromName: fromProd.name,
          toId: toProd._id.toString(),
          toType: 'Product',
          toName: toProd.name,
          relationshipType: 'HAS_ACCESSORY',
          weight: 5,
          description: acc.description || `${toProd.name} is an accessory for ${fromProd.name}`
        });

        // Also push to product's accessories array
        await Product.findByIdAndUpdate(fromProd._id, {
          $addToSet: { accessories: toProd._id }
        });
      }
    }

    // 7. Product RELATED_TO Product (Bidirectional semantic link)
    console.log('[Seed] Linking Related Products...');
    for (const rel of seedData.relatedProducts) {
      const fromProd = productSlugMap.get(rel.from);
      const toProd = productSlugMap.get(rel.to);
      if (fromProd && toProd) {
        relationships.push({
          fromId: fromProd._id.toString(),
          fromType: 'Product',
          fromName: fromProd.name,
          toId: toProd._id.toString(),
          toType: 'Product',
          toName: toProd.name,
          relationshipType: 'RELATED_TO',
          weight: 4,
          description: rel.description || `${fromProd.name} is related to ${toProd.name}`
        });

        relationships.push({
          fromId: toProd._id.toString(),
          fromType: 'Product',
          fromName: toProd.name,
          toId: fromProd._id.toString(),
          toType: 'Product',
          toName: fromProd.name,
          relationshipType: 'RELATED_TO',
          weight: 4,
          description: rel.description || `${toProd.name} is related to ${fromProd.name}`
        });

        await Product.findByIdAndUpdate(fromProd._id, {
          $addToSet: { relatedProducts: toProd._id }
        });
        await Product.findByIdAndUpdate(toProd._id, {
          $addToSet: { relatedProducts: fromProd._id }
        });
      }
    }

    // 8. Bulk insert Relationships
    console.log(`[Seed] Inserting ${relationships.length} graph relationships...`);
    await Relationship.insertMany(relationships);

    console.log('----------------------------------------------------');
    console.log(' Database Seeded Successfully!');
    console.log(`  - Categories: ${insertedCategories.length}`);
    console.log(`  - Interests: ${insertedInterests.length}`);
    console.log(`  - Products: ${insertedProducts.length}`);
    console.log(`  - Customers: ${insertedCustomers.length}`);
    console.log(`  - Graph Relationships: ${relationships.length}`);
    console.log('----------------------------------------------------');

    return {
      success: true,
      counts: {
        categories: insertedCategories.length,
        interests: insertedInterests.length,
        products: insertedProducts.length,
        customers: insertedCustomers.length,
        relationships: relationships.length
      }
    };
  } catch (error) {
    console.error('[Seed Error] Failed to populate database:', error);
    return { success: false, error: error.message };
  }
};

// If run directly from CLI (e.g., node src/seeds/seed.js)
if (require.main === module) {
  seedDatabase().then(() => {
    mongoose.connection.close();
    process.exit(0);
  }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = seedDatabase;
