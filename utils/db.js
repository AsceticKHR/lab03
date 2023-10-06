const { MongoClient, ObjectId } = require('mongodb');

process.env.MONGODB_URI = 'mongodb://kehaoran:6H3eqFkUZtjmdnzkHPg7rSCuHPNbLdpYoKOtp97vuqcTX4gaNjRM6NqWnxz9s1sbYiQ7SKmkn8fHACDbPNeeOg==@kehaoran.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@kehaoran@';

if (!process.env.MONGODB_URI) {
    // throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
    process.env.MONGODB_URI = 'mongodb://localhost:27017';
}

// Connect to MongoDB
async function connectToDB() {
    const client = await MongoClient.connect(process.env.MONGODB_URI, { useUnifiedTopology: true });
    const db = client.db('bookingsDB');
    db.client = client;
    return db;
}

module.exports = { connectToDB, ObjectId };