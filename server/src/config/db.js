const mongoose = require('mongoose');

let isConnected = false;
let connectionError = null;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/smartshop';
  
  try {
    // 3-second timeout to prevent indefinite hangs if MongoDB is not running
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
      connectTimeoutMS: 3000
    });
    
    isConnected = true;
    connectionError = null;
    console.log(`[MongoDB] Connected successfully to: ${conn.connection.host}/${conn.connection.name}`);
    return true;
  } catch (error) {
    isConnected = false;
    connectionError = error.message;
    console.error(`[MongoDB] Connection failed: ${error.message}`);
    console.log(`[MongoDB Setup Guide]:`);
    console.log(`  1. Ensure MongoDB is installed or start it using: mongod --dbpath <data_folder>`);
    console.log(`  2. Default connection URI: ${uri}`);
    console.log(`  3. Seed demo data using: npm run seed`);
    return false;
  }
};

const getDBStatus = () => ({
  isConnected,
  uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/smartshop',
  error: connectionError,
  setupInstructions: 'To run MongoDB locally: start mongod (e.g. `mongod --dbpath ./data/db`), then run `npm run seed` to populate data.'
});

module.exports = { connectDB, getDBStatus };
