import React from 'react';
import { AlertTriangle, ExternalLink } from 'lucide-react';

interface EnvironmentCheckProps {
  missingVars: string[];
}

export const EnvironmentCheck: React.FC<EnvironmentCheckProps> = ({ missingVars }) => {
  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-4">
          <AlertTriangle className="h-8 w-8 text-red-500 mr-3" />
          <h1 className="text-xl font-bold text-gray-900">Configuration Error</h1>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-700 mb-4">
            The following environment variables are missing or invalid:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 bg-gray-50 p-3 rounded">
            {missingVars.map((envVar) => (
              <li key={envVar} className="font-mono">{envVar}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">For Development:</h3>
            <p className="text-sm text-blue-800 mb-2">
              Create a <code className="bg-blue-100 px-1 rounded">.env.local</code> file in your project root with:
            </p>
            <pre className="text-xs bg-blue-100 p-2 rounded overflow-x-auto">
{`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key
CLERK_SECRET_KEY=sk_test_your_secret_key`}
            </pre>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">For Production:</h3>
            <p className="text-sm text-green-800">
              Set these environment variables in your deployment platform or server.
            </p>
          </div>

          <div className="flex items-center justify-center pt-4">
            <a
              href="https://clerk.com/docs/quickstarts/nextjs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
            >
              View Clerk Setup Guide
              <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};