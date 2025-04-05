# Database Access Guide for FarmDirect

This guide explains how to access and use the MongoDB database in the FarmDirect application.

## Database Connection

The FarmDirect application uses MongoDB as its database. The connection is managed through a utility function in `app/api/lib/utils/database.js`.

## Environment Setup

1. Ensure you have a `.env` file in the root of your project with the MongoDB connection string:

```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
```

Replace `<username>`, `<password>`, and `<dbname>` with your actual MongoDB credentials.

2. If you don't have MongoDB set up, you can:
   - Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a cloud-hosted database
   - Install [MongoDB Community Edition](https://www.mongodb.com/try/download/community) locally

## Database Testing

We've implemented a database connection test page to verify your setup:

1. Navigate to `/admin/database-test` in your browser
2. The page will attempt to connect to your database and display the results
3. If successful, you'll see database statistics and sample data
4. If there's an error, troubleshooting tips will be displayed

## Seeding Test Data

To populate your database with sample data:

1. Ensure your database is empty or you're ready to add test data
2. Navigate to `/api/seed-db` in your browser
3. The endpoint will add sample farm polls to your database
4. If data already exists, the seed operation will be safely cancelled

## Using the Database in API Routes

Here's how to use the database in your API routes:

```javascript
import connectToDatabase from '@/app/api/lib/utils/database';
import FarmPoll from '@/app/api/lib/models/FarmPoll';

export async function GET(request) {
  // 1. Connect to the database
  await connectToDatabase();
  
  // 2. Perform database operations
  const polls = await FarmPoll.find({});
  
  // 3. Return response
  return NextResponse.json({ polls });
}
```

## Available Models

Currently, we have the following models available:

### FarmPoll

Located at `app/api/lib/models/FarmPoll.js`

Fields:
- `farmerId`: ID of the farmer who created the poll
- `title`: Poll title
- `description`: Poll description
- `location`: Object containing district, state, and coordinates
- `cropSeason`: Season for the crop (kharif, rabi, zaid, year-round)
- `pollType`: Type of poll (personal or public)
- `options`: Array of crop options with votes
- `status`: Poll status (active, closed, implemented)
- `selectedOption`: Selected crop option after poll is closed
- `deadline`: Voting deadline date
- `createdAt`: Poll creation date
- `updatedAt`: Poll update date

Methods:
- `getCropTrendByRegion`: Static method to check crop trends in a region

## Database Schema Extensions

When adding new models, follow these steps:

1. Create a new model file in `app/api/lib/models/`
2. Define the schema with appropriate fields, methods, and indexes
3. Make sure to connect to the database before using the model
4. Test your model through the API routes

## Troubleshooting

If you encounter database connection issues:

1. Check your MongoDB connection string in the `.env` file
2. Ensure MongoDB service is running (if using a local installation)
3. Verify network connectivity to the database server
4. Check user credentials and database access permissions
5. Look for error messages in the server console logs 