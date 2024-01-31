const { MongoClient } = require('mongodb');
 
// MongoDB connection string
;
const uri = 'mongodb://127.0.0.1:27017/admin';
 
// Lambda function handler
exports.handler = async (event) => {
    try {
        // Connect to MongoDB
        const client = new MongoClient(uri);
        await client.connect();
 
        // Access the database and collection
        const database = client.db('admin');
        const collection = database.collection('school');
 
        // Find documents in the collection
        const result = await collection.find({}).toArray();
 
        // Close the MongoDB connection
        await client.close();
 
        // Return the result
        return {
            statusCode: 200,
            body: JSON.stringify(result),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};