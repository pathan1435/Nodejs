const { MongoClient } = require('mongodb');

// MongoDB connection string
const uri = 'mongodb://127.0.0.1:27017/admin';

exports.insertDataHandler = async (event) => {
  try {
    // Connect to MongoDB
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    // Access the database and collection
    const database = client.db('admin');
    const collection = database.collection('school');

    // Parse the incoming JSON request body
    const requestBody = JSON.parse(event.body);

    // Assuming requestBody is an object with keys 'school' and 'city'
    const dataToInsert = {
      school: requestBody.school_name,
      city: requestBody.grade,
      // ... add more keys as needed
    };

    // Insert document into the collection
    const result = await collection.insertOne(dataToInsert);

    // Close the MongoDB connection
    await client.close();

    // Return the result
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Data inserted successfully',
        data: dataToInsert,
      }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
