'use client';

import { useState, useEffect } from 'react';

export default function DatabaseTestPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDatabaseStatus() {
      try {
        setLoading(true);
        const response = await fetch('/api/test-db');
        const result = await response.json();
        
        if (!response.ok) {
          throw new Error(result.message || 'Failed to connect to database');
        }
        
        setData(result.data);
      } catch (err) {
        console.error('Error testing database connection:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDatabaseStatus();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Database Connection Test</h1>
      
      {loading && (
        <div className="p-4 bg-blue-50 rounded">
          <p>Testing database connection...</p>
        </div>
      )}
      
      {error && (
        <div className="p-4 bg-red-50 rounded border border-red-200">
          <h2 className="font-bold text-red-600">Connection Error</h2>
          <p>{error}</p>
          <div className="mt-4 p-3 bg-gray-50 rounded">
            <h3 className="font-semibold">Troubleshooting Tips:</h3>
            <ul className="list-disc pl-5 mt-2">
              <li>Check your MongoDB connection string in the .env file</li>
              <li>Ensure MongoDB service is running</li>
              <li>Verify network connectivity to the database server</li>
              <li>Check user credentials and database access permissions</li>
            </ul>
          </div>
        </div>
      )}
      
      {data && (
        <div className="space-y-6">
          <div className="p-4 bg-green-50 rounded border border-green-200">
            <h2 className="font-bold text-green-600">Connection Successful!</h2>
            <p>Your application is successfully connected to the MongoDB database.</p>
          </div>
          
          <div className="bg-white p-6 rounded shadow">
            <h2 className="font-bold mb-3">Database Statistics</h2>
            <p><span className="font-semibold">Total Polls:</span> {data.totalPolls}</p>
          </div>
          
          {data.latestPolls && data.latestPolls.length > 0 && (
            <div className="bg-white p-6 rounded shadow">
              <h2 className="font-bold mb-3">Latest Polls</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 text-left">Title</th>
                      <th className="py-2 px-4 text-left">Season</th>
                      <th className="py-2 px-4 text-left">Status</th>
                      <th className="py-2 px-4 text-left">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.latestPolls.map((poll, index) => (
                      <tr key={index} className="border-t">
                        <td className="py-2 px-4">{poll.title}</td>
                        <td className="py-2 px-4">{poll.cropSeason}</td>
                        <td className="py-2 px-4">{poll.status}</td>
                        <td className="py-2 px-4">{new Date(poll.createdAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          <div className="bg-white p-6 rounded shadow">
            <h2 className="font-bold mb-3">How to Use the Database</h2>
            <div className="bg-gray-50 p-4 rounded font-mono text-sm overflow-x-auto">
              <pre>{`
// In your API route
import connectToDatabase from '@/app/api/lib/utils/database';
import FarmPoll from '@/app/api/lib/models/FarmPoll';

export async function GET(request) {
  // Connect to database
  await connectToDatabase();
  
  // Perform database operations
  const polls = await FarmPoll.find({});
  
  // Return response
  return NextResponse.json({ polls });
}
              `}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 