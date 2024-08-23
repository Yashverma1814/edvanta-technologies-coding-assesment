const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const uri = 'mongodb://localhost:27017';

const dbName = 'myDatabaseEdvanta';
const collectionName = 'myCollectionedvanta';

const filePath = path.join(__dirname, 'promts.json');

async function pushJsonToMongoDB() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const data = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(data);

    if (Array.isArray(jsonData)) {
      const result = await collection.insertMany(jsonData);
      console.log(`${result.insertedCount} documents were inserted`);
    } else {
      const result = await collection.insertOne(jsonData);
      console.log(`Document inserted with _id: ${result.insertedId}`);
    }

  } catch (error) {
    console.error('Error pushing JSON to MongoDB:', error);
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

pushJsonToMongoDB();
