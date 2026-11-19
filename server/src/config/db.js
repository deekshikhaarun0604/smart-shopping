const mongoose = require('mongoose');

let isConnected = false;
let connectionError = null;

const connectDB = async () => {
  // Return immediately if already connected
  if (mongoose.connection.readyState === 1) {
    isConnected = true;
    return true;
  }

  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/smartshop';
  const isAtlas = uri.includes('mongodb+srv') || uri.includes('mongodb.net');
  
  try {
    // 15s timeout for Atlas cloud DNS/SSL connections, 5s for local
    const timeout = isAtlas ? 15000 : 5000;
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: timeout,
      connectTimeoutMS: timeout
    });
    
    isConnected = true;
    connectionError = null;
    const dbName = conn.connection.name || 'smartshop';
    const provider = isAtlas ? 'MongoDB Atlas' : 'Local MongoDB';
    console.log(`[MongoDB] Connected successfully to ${provider} (database: "${dbName}")`);
    return true;
  } catch (error) {
    isConnected = false;
    connectionError = error.message;
    console.error(`[MongoDB] Connection failed: ${error.message}`);
    console.log(`[MongoDB Setup Guide]:`);
    if (isAtlas) {
      console.log(`  1. Ensure Network Access in MongoDB Atlas allows IP '0.0.0.0/0' (Allow Access from Anywhere) for Render.`);
      console.log(`  2. Verify database username and password in MONGODB_URI environment variable on Render.`);
      console.log(`  3. Ensure the database user has 'readWrite' privileges.`);
    } else {
      console.log(`  1. Ensure MongoDB is running locally (e.g. mongod --dbpath ./data/db)`);
      console.log(`  2. Default local database: smartshop on port 27017`);
      console.log(`  3. Seed demo data using: npm run seed`);
    }
    return false;
  }
};

const getDBStatus = () => {
  const uri = process.env.MONGODB_URI || '';
  const isAtlas = uri.includes('mongodb+srv') || uri.includes('mongodb.net');
  return {
    status: isConnected ? 'connected' : 'disconnected',
    isConnected,
    provider: isAtlas ? 'MongoDB Atlas' : 'Local MongoDB',
    setupInstructions: isConnected
      ? null
      : (isAtlas
          ? 'MongoDB Atlas connection is offline. Verify your MONGODB_URI and IP access (0.0.0.0/0) in Atlas.'
          : 'To run MongoDB locally: start mongod (e.g. `mongod --dbpath ./data/db`), then run `npm run seed`.')
  };
};

module.exports = { connectDB, getDBStatus };
