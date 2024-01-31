const { MongoClient, ObjectId } = require('mongodb');

// MongoDB connection string
const uri = 'mongodb://127.0.0.1:27017/admin';

exports.updateSchoolNameHandler = async (event) => {
  try {
    // Connect to MongoDB
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    // Access the database and collection
    const database = client.db('admin');
    const collection = database.collection('school');

    // Extract the ID from the path parameters
    const id = event.pathParameters.id;

    // Parse the incoming JSON request body
    const requestBody = JSON.parse(event.body);

    // Assuming requestBody is an object with a key 'school_name'
    const filter = { _id: new ObjectId(id) }; // Use new ObjectId()
    const updateDocument = {
      $set: {
        school_name: requestBody.school_name,
        // ... add more keys to update as needed
      },
    };

    // Update document in the collection
    const result = await collection.updateOne(filter, updateDocument);

    // Close the MongoDB connection
    await client.close();

    if (result.modifiedCount === 1) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'School name updated successfully',
          data: updateDocument.$set,
        }),
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
