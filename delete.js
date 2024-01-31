const { MongoClient, ObjectId } = require('mongodb');

// MongoDB connection string
const uri = 'mongodb://127.0.0.1:27017/admin';

exports.deleteSchoolHandler = async (event) => {
  try {
    // Connect to MongoDB
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    // Access the database and collection
    const database = client.db('admin');
    const collection = database.collection('school');

    // Extract the ID from the path parameters
    const id = event.pathParameters.id;

    // Convert the ID to ObjectId
    const objectId = new ObjectId(id);

    // Delete document from the collection
    const result = await collection.deleteOne({ _id: objectId });

    // Close the MongoDB connection
    await client.close();

    if (result.deletedCount === 1) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'School deleted successfully' }),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'School not found' }),
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
