# MongoDB Lambda API

## Overview

This API facilitates MongoDB operations through a Lambda function. It includes endpoints for retrieving, updating, deleting, and inserting data into the 'school' collection in the 'admin' database.

## Endpoints

### Retrieve MongoDB Data

- **Endpoint**: `/prod/mongodb-data`
- **Method**: `GET`
- **Description**: Retrieve all documents from the 'school' collection.
- **Responses**:
  - `200 OK`: Successful response with an array of documents.
  - `500 Internal Server Error`: Error response.

### Insert Data

- **Endpoint**: `/prod/mongodb-data`
- **Method**: `POST`
- **Description**: Insert data into the 'school' collection.
- **Request Body**:
  - `school_name` (string): The name of the school.
  - `grade` (string): The city of the school.
  - Additional keys as needed.
- **Responses**:
  - `200 OK`: Successful response with a message and inserted data.
  - `500 Internal Server Error`: Error response.

### Get Document by ID

- **Endpoint**: `/prod/mongodb-data/{id}`
- **Method**: `GET`
- **Description**: Retrieve a document by ID from the 'school' collection.
- **Parameters**:
  - `id` (string): The ID of the document to retrieve.
- **Responses**:
  - `200 OK`: Successful response with the retrieved document.
  - `404 Not Found`: Document not found.
  - `500 Internal Server Error`: Error response.

### Update School Name by ID

- **Endpoint**: `/prod/mongodb-data/{id}`
- **Method**: `PUT`
- **Description**: Update the school name in the 'school' collection by ID.
- **Parameters**:
  - `id` (string): The ID of the school to update.
- **Request Body**:
  - `school_name` (string): The updated school name.
- **Responses**:
  - `200 OK`: Successful response with a message and updated data.
  - `404 Not Found`: School not found.
  - `500 Internal Server Error`: Error response.

### Delete School by ID

- **Endpoint**: `/prod/mongodb-data/{id}`
- **Method**: `DELETE`
- **Description**: Delete a school from the 'school' collection by ID.
- **Parameters**:
  - `id` (string): The ID of the school to delete.
- **Responses**:
  - `200 OK`: Successful response with a deletion message.
  - `404 Not Found`: School not found.
  - `500 Internal Server Error`: Error response.

## Schemas

### MongoDBResult

- `statusCode` (integer): HTTP status code.
- `body` (string): Response body in JSON format.

### InsertDataRequest

- `school_name` (string): The name of the school.
- `grade` (string): The city of the school.
- Additional keys as needed.

### Document

- `_id` (string): The ID of the document.
- `name` (string): The name of the school.
- `location` (string): The location of the school.

### UpdateSchoolNameRequest

- `school_name` (string): The updated school name.

### DeleteSchoolResponse

- `message` (string): The deletion success message.
- `error` (string): The error message if the school is not found or an internal server error occurs.
