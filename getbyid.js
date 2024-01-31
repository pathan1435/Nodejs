const { MongoClient, ObjectId } = require('mongodb');

// MongoDB connection string
const uri = 'mongodb://127.0.0.1:27017/admin';

// Lambda function handler
exports.getbyid = async (event) => {
    try {
        // Connect to MongoDB
        const client = new MongoClient(uri);
        await client.connect();

        // Access the database and collection
        const database = client.db('admin');
        const collection = database.collection('school');

        // Extract the ID from the path parameters
        const id = event.pathParameters.id;

        // Convert the ID to ObjectId
        const objectId = new ObjectId(id);

        // Find a document by ID in the collection
        const result = await collection.findOne({ _id: objectId });

        // Close the MongoDB connection
        await client.close();

        // Check if the document was found
        if (result) {
            return {
                statusCode: 200,
                body: JSON.stringify(result),
            };
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Document not found' }),
            };
        }
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};
