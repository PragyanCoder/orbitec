import React, { useState } from 'react';
import { Search, Book, Code, Zap, Shield, Globe, ChevronRight, Copy, Check } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const DocumentationPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState('getting-started');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Zap,
      items: [
        { id: 'getting-started', title: 'Quick Start Guide' },
        { id: 'first-deployment', title: 'Your First Deployment' },
        { id: 'environment-setup', title: 'Environment Setup' }
      ]
    },
    {
      id: 'api-reference',
      title: 'API Reference',
      icon: Code,
      items: [
        { id: 'authentication', title: 'Authentication' },
        { id: 'applications', title: 'Applications API' },
        { id: 'deployments', title: 'Deployments API' },
        { id: 'billing', title: 'Billing API' }
      ]
    },
    {
      id: 'deployment',
      title: 'Deployment',
      icon: Globe,
      items: [
        { id: 'supported-frameworks', title: 'Supported Frameworks' },
        { id: 'environment-variables', title: 'Environment Variables' },
        { id: 'custom-domains', title: 'Custom Domains' },
        { id: 'ssl-certificates', title: 'SSL Certificates' }
      ]
    },
    {
      id: 'security',
      title: 'Security',
      icon: Shield,
      items: [
        { id: 'security-overview', title: 'Security Overview' },
        { id: 'data-protection', title: 'Data Protection' },
        { id: 'compliance', title: 'Compliance' }
      ]
    }
  ];

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const CodeBlock: React.FC<{ code: string; language: string; id: string }> = ({ code, language, id }) => (
    <div className="relative bg-gray-900 rounded-lg p-4 my-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-400">{language}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => copyToClipboard(code, id)}
          className="text-gray-400 hover:text-white"
        >
          {copiedCode === id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
      <pre className="text-green-400 text-sm overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'getting-started':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Quick Start Guide</h1>
            <p className="text-lg text-gray-600">
              Get your application deployed in minutes with Orbit Technology.
            </p>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. Sign Up & Get Credits</h2>
                <p className="text-gray-600 mb-3">
                  Create your account and get started with free credits using redeem codes.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 font-medium">🎉 New users get $200 in free credits with redeem codes!</p>
                  <p className="text-blue-700 text-sm mt-1">Contact us to get your redeem code and start deploying for free.</p>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. Prepare Your Repository</h2>
                <p className="text-gray-600 mb-3">
                  Make sure your GitHub repository is ready for deployment.
                </p>
                
                <CodeBlock
                  id="repo-structure"
                  language="text"
                  code={`# Example Node.js app structure
my-app/
├── package.json          # Required for Node.js apps
├── src/
│   └── index.js         # Your application entry point
├── .env.example         # Environment variables template
└── Dockerfile           # Optional: Custom Docker configuration

# Example Python app structure  
my-python-app/
├── requirements.txt     # Required for Python apps
├── app.py              # Your application entry point
└── Dockerfile          # Optional: Custom Docker configuration`}
                />
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. Deploy Your Application</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-1">1</div>
                    <div>
                      <h3 className="font-medium text-gray-900">Connect Repository</h3>
                      <p className="text-gray-600 text-sm">Enter your GitHub repository URL in the deployment form.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-1">2</div>
                    <div>
                      <h3 className="font-medium text-gray-900">Configure Environment</h3>
                      <p className="text-gray-600 text-sm">Set up your environment variables and deployment settings.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-1">3</div>
                    <div>
                      <h3 className="font-medium text-gray-900">Deploy & Go Live</h3>
                      <p className="text-gray-600 text-sm">Click deploy and watch your app go live at yourapp.orbittechnology.tech</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'first-deployment':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Your First Deployment</h1>
            <p className="text-lg text-gray-600">
              Step-by-step guide to deploy your first application.
            </p>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Prerequisites</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>A GitHub repository with your application code</li>
                  <li>An Orbit Technology account with credits</li>
                  <li>Basic knowledge of your application's requirements</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Step 1: Access the Dashboard</h2>
                <p className="text-gray-600 mb-3">
                  After signing in, navigate to your dashboard and click "New Application".
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Step 2: Repository Configuration</h2>
                <CodeBlock
                  id="repo-config"
                  language="text"
                  code={`Application Name: my-awesome-app
Repository URL: https://github.com/username/my-awesome-app
Branch: main (or your preferred branch)`}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Step 3: Environment Variables</h2>
                <p className="text-gray-600 mb-3">
                  Configure any environment variables your application needs:
                </p>
                <CodeBlock
                  id="env-vars"
                  language="text"
                  code={`NODE_ENV=production
API_URL=https://api.example.com
DATABASE_URL=your_database_connection_string
PORT=3000`}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Step 4: Deploy</h2>
                <p className="text-gray-600 mb-3">
                  Review your configuration and click "Deploy Application". You'll see real-time logs as your app builds and deploys.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-medium">🚀 Your app will be live at: yourapp.orbittechnology.tech</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'environment-setup':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Environment Setup</h1>
            <p className="text-lg text-gray-600">
              Configure your development environment for optimal deployment.
            </p>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Local Development</h2>
                <p className="text-gray-600 mb-3">
                  Set up your local environment to match production:
                </p>
                <CodeBlock
                  id="local-setup"
                  language="bash"
                  code={`# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev`}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Docker Configuration</h2>
                <p className="text-gray-600 mb-3">
                  Optional: Create a custom Dockerfile for advanced configurations:
                </p>
                <CodeBlock
                  id="dockerfile"
                  language="dockerfile"
                  code={`FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]`}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Best Practices</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Use environment variables for configuration</li>
                  <li>Include a .env.example file with required variables</li>
                  <li>Add health check endpoints for monitoring</li>
                  <li>Use proper logging for debugging</li>
                  <li>Optimize your Docker image size</li>
                </ul>
              </div>
            </div>
          </div>
        );
        
      case 'authentication':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">API Authentication</h1>
            <p className="text-lg text-gray-600">
              Authenticate your API requests using Bearer tokens.
            </p>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Getting Your API Key</h2>
                <p className="text-gray-600 mb-3">
                  Generate an API key from your dashboard settings:
                </p>
                <ol className="list-decimal list-inside text-gray-600 space-y-2">
                  <li>Go to Dashboard → Settings → API & Webhooks</li>
                  <li>Click "Generate New API Key"</li>
                  <li>Copy and securely store your API key</li>
                  <li>Use the key in your API requests</li>
                </ol>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Making Authenticated Requests</h2>
                <CodeBlock
                  id="auth-header"
                  language="bash"
                  code={`curl -H "Authorization: Bearer orbit_sk_1234567890abcdef" \\
  -H "Content-Type: application/json" \\
  https://orbittechnology.tech/api/applications`}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Response Format</h2>
                <CodeBlock
                  id="auth-response"
                  language="json"
                  code={`{
  "success": true,
  "data": [
    {
      "id": "app_123",
      "name": "my-app",
      "status": "running",
      "subdomain": "my-app.orbittechnology.tech",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "meta": {
    "total": 1,
    "page": 1
  }
}`}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Error Handling</h2>
                <CodeBlock
                  id="error-response"
                  language="json"
                  code={`{
  "success": false,
  "error": "Unauthorized",
  "message": "Invalid or missing API key",
  "code": 401
}`}
                />
              </div>
            </div>
          </div>
        );
        
      case 'applications':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Applications API</h1>
            <p className="text-lg text-gray-600">
              Manage your applications programmatically.
            </p>
            
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">List Applications</h2>
                <p className="text-gray-600 mb-4">Get all applications for the authenticated user.</p>
                <CodeBlock
                  id="list-apps"
                  language="bash"
                  code={`GET /api/applications
Authorization: Bearer YOUR_API_KEY

# Response
{
  "success": true,
  "data": [
    {
      "id": "app_123",
      "name": "my-blog",
      "status": "running",
      "subdomain": "my-blog.orbittechnology.tech",
      "repoUrl": "https://github.com/user/my-blog",
      "branch": "main",
      "createdAt": "2024-01-15T10:30:00Z",
      "lastDeployment": "2024-01-15T12:00:00Z"
    }
  ]
}`}
                />
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Create Application</h2>
                <p className="text-gray-600 mb-4">Deploy a new application from a GitHub repository.</p>
                <CodeBlock
                  id="create-app"
                  language="bash"
                  code={`POST /api/applications
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY

{
  "name": "my-new-app",
  "repoUrl": "https://github.com/user/my-new-app",
  "branch": "main",
  "envVars": {
    "NODE_ENV": "production",
    "API_URL": "https://api.example.com"
  }
}

# Response
{
  "success": true,
  "data": {
    "id": "app_456",
    "name": "my-new-app",
    "subdomain": "my-new-app.orbittechnology.tech",
    "status": "building",
    "message": "Application deployment started"
  }
}`}
                />
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Get Application Details</h2>
                <CodeBlock
                  id="get-app"
                  language="bash"
                  code={`GET /api/applications/:id
Authorization: Bearer YOUR_API_KEY

# Response
{
  "success": true,
  "data": {
    "id": "app_123",
    "name": "my-blog",
    "status": "running",
    "subdomain": "my-blog.orbittechnology.tech",
    "repoUrl": "https://github.com/user/my-blog",
    "branch": "main",
    "envVars": {
      "NODE_ENV": "production"
    },
    "deploymentCount": 5,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}`}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Application Actions</h2>
                <CodeBlock
                  id="app-actions"
                  language="bash"
                  code={`# Start application
POST /api/applications/:id/start
Authorization: Bearer YOUR_API_KEY

# Stop application  
POST /api/applications/:id/stop
Authorization: Bearer YOUR_API_KEY

# Restart application
POST /api/applications/:id/restart
Authorization: Bearer YOUR_API_KEY

# Delete application
DELETE /api/applications/:id
Authorization: Bearer YOUR_API_KEY`}
                />
              </div>
            </div>
          </div>
        );

      case 'deployments':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Deployments API</h1>
            <p className="text-lg text-gray-600">
              Monitor and manage your application deployments.
            </p>
            
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">List Deployments</h2>
                <CodeBlock
                  id="list-deployments"
                  language="bash"
                  code={`GET /api/deployments
Authorization: Bearer YOUR_API_KEY

# Response
{
  "success": true,
  "data": [
    {
      "id": "deploy_123",
      "applicationId": "app_123",
      "applicationName": "my-blog",
      "status": "success",
      "buildTime": 135000,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}`}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Get Deployment Logs</h2>
                <CodeBlock
                  id="deployment-logs"
                  language="bash"
                  code={`GET /api/deployments/:id/logs
Authorization: Bearer YOUR_API_KEY

# Response
{
  "success": true,
  "data": {
    "id": "deploy_123",
    "status": "success",
    "logs": [
      "[2024-01-15 10:30:00] Starting deployment...",
      "[2024-01-15 10:30:05] Cloning repository...",
      "[2024-01-15 10:30:15] Installing dependencies...",
      "[2024-01-15 10:31:30] Building application...",
      "[2024-01-15 10:32:45] Deployment successful!"
    ]
  }
}`}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Retry Failed Deployment</h2>
                <CodeBlock
                  id="retry-deployment"
                  language="bash"
                  code={`POST /api/deployments/:id/retry
Authorization: Bearer YOUR_API_KEY

# Response
{
  "success": true,
  "data": {
    "message": "Deployment retry initiated",
    "deploymentId": "deploy_456"
  }
}`}
                />
              </div>
            </div>
          </div>
        );

      case 'billing':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Billing API</h1>
            <p className="text-lg text-gray-600">
              Manage billing, credits, and payment methods.
            </p>
            
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Get Billing Information</h2>
                <CodeBlock
                  id="get-billing"
                  language="bash"
                  code={`GET /api/billing
Authorization: Bearer YOUR_API_KEY

# Response
{
  "success": true,
  "data": {
    "credits": 150.00,
    "hasPaymentMethod": true,
    "transactions": [
      {
        "id": "txn_123",
        "type": "credit",
        "amount": 200.00,
        "description": "Redeem code applied",
        "status": "completed",
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ]
  }
}`}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Redeem Code</h2>
                <CodeBlock
                  id="redeem-code"
                  language="bash"
                  code={`POST /api/billing/redeem
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY

{
  "code": "WELCOME200"
}

# Response
{
  "success": true,
  "data": {
    "message": "Code redeemed successfully",
    "credits": 200.00,
    "newBalance": 350.00
  }
}`}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Purchase Credits</h2>
                <CodeBlock
                  id="purchase-credits"
                  language="bash"
                  code={`POST /api/billing/purchase-credits
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY

{
  "amount": 100
}

# Response
{
  "success": true,
  "data": {
    "message": "Credits purchased successfully",
    "amount": 100.00,
    "newBalance": 450.00
  }
}`}
                />
              </div>
            </div>
          </div>
        );

      case 'supported-frameworks':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Supported Frameworks</h1>
            <p className="text-lg text-gray-600">
              Orbit Technology supports a wide range of frameworks and languages.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900">Node.js</h3>
                </CardHeader>
                <CardContent>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Express.js</li>
                    <li>• Next.js</li>
                    <li>• Nuxt.js</li>
                    <li>• Nest.js</li>
                    <li>• React</li>
                    <li>• Vue.js</li>
                    <li>• Angular</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900">Python</h3>
                </CardHeader>
                <CardContent>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Django</li>
                    <li>• Flask</li>
                    <li>• FastAPI</li>
                    <li>• Streamlit</li>
                    <li>• Dash</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900">PHP</h3>
                </CardHeader>
                <CardContent>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Laravel</li>
                    <li>• Symfony</li>
                    <li>• CodeIgniter</li>
                    <li>• WordPress</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900">Static Sites</h3>
                </CardHeader>
                <CardContent>
                  <ul className="text-gray-600 space-y-1">
                    <li>• HTML/CSS/JS</li>
                    <li>• Gatsby</li>
                    <li>• Jekyll</li>
                    <li>• Hugo</li>
                    <li>• Vite</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Auto-Detection</h2>
              <p className="text-gray-600 mb-4">
                Our platform automatically detects your framework based on your repository structure:
              </p>
              <CodeBlock
                id="auto-detection"
                language="text"
                code={`# Node.js - Detected by package.json
package.json → npm install && npm start

# Python - Detected by requirements.txt  
requirements.txt → pip install -r requirements.txt && python app.py

# PHP - Detected by composer.json or index.php
composer.json → composer install && php -S 0.0.0.0:8000

# Static - Detected by index.html
index.html → Served directly with nginx`}
              />
            </div>
          </div>
        );

      case 'environment-variables':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Environment Variables</h1>
            <p className="text-lg text-gray-600">
              Configure your application with environment variables.
            </p>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Setting Environment Variables</h2>
                <p className="text-gray-600 mb-4">
                  You can set environment variables during deployment or update them later:
                </p>
                <ol className="list-decimal list-inside text-gray-600 space-y-2">
                  <li>Go to your application dashboard</li>
                  <li>Click on your application</li>
                  <li>Navigate to the "Environment" tab</li>
                  <li>Add or update your variables</li>
                  <li>Restart your application to apply changes</li>
                </ol>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Common Environment Variables</h2>
                <CodeBlock
                  id="common-env-vars"
                  language="bash"
                  code={`# Application Environment
NODE_ENV=production
PORT=3000

# Database Configuration
DATABASE_URL=postgresql://user:pass@host:5432/db
MONGODB_URI=mongodb://user:pass@host:27017/db

# API Keys (these will be hidden in the UI)
STRIPE_SECRET_KEY=sk_live_...
SENDGRID_API_KEY=SG...
JWT_SECRET=your-secret-key

# External Services
REDIS_URL=redis://localhost:6379
ELASTICSEARCH_URL=http://localhost:9200`}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Security Best Practices</h2>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <p className="text-yellow-800 font-medium">🔒 Security Notice</p>
                  <p className="text-yellow-700 text-sm mt-1">
                    Sensitive environment variables (containing "PASSWORD", "SECRET", "KEY", "TOKEN") are automatically hidden in the UI for security.
                  </p>
                </div>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Never commit sensitive data to your repository</li>
                  <li>Use strong, unique secrets for production</li>
                  <li>Rotate API keys and secrets regularly</li>
                  <li>Use different values for development and production</li>
                  <li>Limit access to sensitive environment variables</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Using Environment Variables in Code</h2>
                <CodeBlock
                  id="using-env-vars"
                  language="javascript"
                  code={`// Node.js
const port = process.env.PORT || 3000;
const dbUrl = process.env.DATABASE_URL;
const apiKey = process.env.API_KEY;

// Python
import os
port = os.environ.get('PORT', 3000)
db_url = os.environ.get('DATABASE_URL')
api_key = os.environ.get('API_KEY')

// PHP
$port = $_ENV['PORT'] ?? 3000;
$dbUrl = $_ENV['DATABASE_URL'];
$apiKey = $_ENV['API_KEY'];`}
                />
              </div>
            </div>
          </div>
        );

      case 'custom-domains':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Custom Domains</h1>
            <p className="text-lg text-gray-600">
              Connect your own domain to your applications.
            </p>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Adding a Custom Domain</h2>
                <ol className="list-decimal list-inside text-gray-600 space-y-2">
                  <li>Go to Dashboard → Domains</li>
                  <li>Click "Add Domain"</li>
                  <li>Enter your domain name (e.g., myapp.com)</li>
                  <li>Select the application to connect</li>
                  <li>Configure your DNS settings</li>
                  <li>Wait for verification and SSL certificate</li>
                </ol>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">DNS Configuration</h2>
                <p className="text-gray-600 mb-4">
                  Configure your domain's DNS settings with your domain provider:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold text-gray-900">CNAME Record (Recommended)</h3>
                    </CardHeader>
                    <CardContent>
                      <CodeBlock
                        id="cname-record"
                        language="text"
                        code={`Type: CNAME
Name: @ (or your subdomain)
Value: orbittechnology.tech
TTL: 300 (or default)`}
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold text-gray-900">A Record (Alternative)</h3>
                    </CardHeader>
                    <CardContent>
                      <CodeBlock
                        id="a-record"
                        language="text"
                        code={`Type: A
Name: @ (or your subdomain)
Value: 192.168.1.100
TTL: 300 (or default)`}
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibent text-gray-900 mb-3">Subdomain Configuration</h2>
                <p className="text-gray-600 mb-4">
                  For subdomains (like api.myapp.com), use the subdomain as the name:
                </p>
                <CodeBlock
                  id="subdomain-config"
                  language="text"
                  code={`# For api.myapp.com
Type: CNAME
Name: api
Value: orbittechnology.tech

# For www.myapp.com  
Type: CNAME
Name: www
Value: orbittechnology.tech`}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Verification Process</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-1">1</div>
                    <div>
                      <h3 className="font-medium text-gray-900">DNS Propagation</h3>
                      <p className="text-gray-600 text-sm">DNS changes can take up to 24 hours to propagate globally.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-1">2</div>
                    <div>
                      <h3 className="font-medium text-gray-900">Domain Verification</h3>
                      <p className="text-gray-600 text-sm">We automatically verify your domain configuration.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-1">3</div>
                    <div>
                      <h3 className="font-medium text-gray-900">SSL Certificate</h3>
                      <p className="text-gray-600 text-sm">Free SSL certificate is automatically provisioned.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'ssl-certificates':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">SSL Certificates</h1>
            <p className="text-lg text-gray-600">
              Automatic HTTPS encryption for all your applications.
            </p>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Automatic SSL</h2>
                <p className="text-gray-600 mb-4">
                  All applications on Orbit Technology automatically receive free SSL certificates:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Free SSL certificates for all domains</li>
                  <li>Automatic renewal before expiration</li>
                  <li>Support for custom domains</li>
                  <li>TLS 1.2 and 1.3 support</li>
                  <li>Perfect Forward Secrecy</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Certificate Provisioning</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-1">1</div>
                    <div>
                      <h3 className="font-medium text-gray-900">Domain Verification</h3>
                      <p className="text-gray-600 text-sm">We verify domain ownership through DNS validation.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-1">2</div>
                    <div>
                      <h3 className="font-medium text-gray-900">Certificate Generation</h3>
                      <p className="text-gray-600 text-sm">SSL certificate is automatically generated and installed.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-1">3</div>
                    <div>
                      <h3 className="font-medium text-gray-900">HTTPS Redirect</h3>
                      <p className="text-gray-600 text-sm">All HTTP traffic is automatically redirected to HTTPS.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Certificate Details</h2>
                <CodeBlock
                  id="ssl-details"
                  language="text"
                  code={`Certificate Authority: Let's Encrypt
Encryption: RSA 2048-bit / ECDSA P-256
Protocols: TLS 1.2, TLS 1.3
Validity: 90 days (auto-renewed)
Wildcard: Not supported (use individual domains)`}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Troubleshooting</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Certificate Not Provisioning</h3>
                    <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 mt-2">
                      <li>Verify DNS configuration is correct</li>
                      <li>Wait for DNS propagation (up to 24 hours)</li>
                      <li>Check domain ownership verification</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Mixed Content Warnings</h3>
                    <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 mt-2">
                      <li>Ensure all resources use HTTPS URLs</li>
                      <li>Update API endpoints to use HTTPS</li>
                      <li>Check third-party integrations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'security-overview':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Security Overview</h1>
            <p className="text-lg text-gray-600">
              Orbit Technology implements enterprise-grade security measures.
            </p>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Infrastructure Security</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold text-gray-900">Container Isolation</h3>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Docker container isolation</li>
                        <li>• Resource limits and quotas</li>
                        <li>• Network segmentation</li>
                        <li>• Read-only file systems</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold text-gray-900">Network Security</h3>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-gray-600 space-y-1">
                        <li>• TLS 1.2+ encryption</li>
                        <li>• DDoS protection</li>
                        <li>• Web Application Firewall</li>
                        <li>• Rate limiting</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Data Protection</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Encryption at rest and in transit</li>
                  <li>Regular automated backups</li>
                  <li>Secure environment variable storage</li>
                  <li>Access logging and monitoring</li>
                  <li>GDPR and CCPA compliance</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Access Control</h2>
                <CodeBlock
                  id="access-control"
                  language="text"
                  code={`Authentication: Multi-factor authentication supported
Authorization: Role-based access control (RBAC)
API Security: Bearer token authentication
Session Management: Secure session handling
Audit Logging: Complete activity tracking`}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Compliance</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-medium text-green-900">SOC 2 Type II</h3>
                    <p className="text-green-700 text-sm">Security controls audited</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-medium text-blue-900">GDPR Ready</h3>
                    <p className="text-blue-700 text-sm">Data protection compliance</p>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h3 className="font-medium text-purple-900">ISO 27001</h3>
                    <p className="text-purple-700 text-sm">Information security certified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'data-protection':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Data Protection</h1>
            <p className="text-lg text-gray-600">
              How we protect and handle your data.
            </p>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Data Encryption</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Encryption in Transit</h3>
                    <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 mt-2">
                      <li>TLS 1.2+ for all API communications</li>
                      <li>HTTPS enforced for all web traffic</li>
                      <li>Encrypted database connections</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Encryption at Rest</h3>
                    <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 mt-2">
                      <li>AES-256 encryption for stored data</li>
                      <li>Encrypted database storage</li>
                      <li>Secure environment variable storage</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Data Backup & Recovery</h2>
                <CodeBlock
                  id="backup-policy"
                  language="text"
                  code={`Backup Frequency: Daily automated backups
Retention Period: 30 days for regular backups
Long-term Storage: 1 year for compliance
Recovery Time: < 4 hours for critical data
Geographic Distribution: Multi-region backup storage`}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Data Retention</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Application data: Retained while account is active</li>
                  <li>Deployment logs: 90 days retention</li>
                  <li>Activity logs: 1 year retention</li>
                  <li>Billing records: 7 years for compliance</li>
                  <li>Deleted data: Permanently removed within 30 days</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Your Data Rights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold text-gray-900">Access & Portability</h3>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Export your data anytime</li>
                        <li>• API access to all your data</li>
                        <li>• Standard data formats</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold text-gray-900">Control & Deletion</h3>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Delete applications anytime</li>
                        <li>• Account deletion available</li>
                        <li>• Data anonymization options</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        );

      case 'compliance':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Compliance</h1>
            <p className="text-lg text-gray-600">
              Our compliance certifications and standards.
            </p>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Certifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold text-gray-900">SOC 2 Type II</h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm">
                        Audited security, availability, and confidentiality controls.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold text-gray-900">ISO 27001</h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm">
                        International standard for information security management.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold text-gray-900">PCI DSS</h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm">
                        Payment card industry data security standards compliance.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Privacy Regulations</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900">GDPR (General Data Protection Regulation)</h3>
                    <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 mt-2">
                      <li>Data processing transparency</li>
                      <li>User consent management</li>
                      <li>Right to data portability</li>
                      <li>Right to be forgotten</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">CCPA (California Consumer Privacy Act)</h3>
                    <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 mt-2">
                      <li>Consumer data rights</li>
                      <li>Data sale opt-out</li>
                      <li>Data deletion requests</li>
                      <li>Non-discrimination protection</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Security Standards</h2>
                <CodeBlock
                  id="security-standards"
                  language="text"
                  code={`Encryption: AES-256, TLS 1.2+
Authentication: Multi-factor authentication
Access Control: Role-based permissions
Monitoring: 24/7 security monitoring
Incident Response: < 1 hour response time
Vulnerability Management: Regular security assessments`}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Audit & Reporting</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Annual third-party security audits</li>
                  <li>Quarterly compliance reviews</li>
                  <li>Real-time security monitoring</li>
                  <li>Incident reporting and documentation</li>
                  <li>Compliance reports available upon request</li>
                </ul>
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Welcome to Orbit Technology Documentation</h1>
            <p className="text-lg text-gray-600">
              Everything you need to deploy and scale your applications with confidence.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sections.map((section) => (
                <Card key={section.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <section.icon className="h-8 w-8 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {section.items.map((item) => (
                        <li key={item.id}>
                          <button
                            onClick={() => setActiveSection(item.id)}
                            className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                          >
                            <ChevronRight className="h-3 w-3 mr-1" />
                            {item.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Need Help?</h2>
              <p className="text-gray-600 mb-4">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="flex space-x-4">
                <Button>Contact Support</Button>
                <Button variant="secondary">Join Community</Button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white rounded-lg shadow-sm p-6 mr-8 h-fit">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search docs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <nav className="space-y-4">
              {sections.map((section) => (
                <div key={section.id}>
                  <div className="flex items-center space-x-2 mb-2">
                    <section.icon className="h-4 w-4 text-gray-600" />
                    <h3 className="font-medium text-gray-900">{section.title}</h3>
                  </div>
                  <ul className="ml-6 space-y-1">
                    {section.items.map((item) => (
                      <li key={item.id}>
                        <button
                          onClick={() => setActiveSection(item.id)}
                          className={`text-sm hover:text-blue-600 ${
                            activeSection === item.id ? 'text-blue-600 font-medium' : 'text-gray-600'
                          }`}
                        >
                          {item.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 bg-white rounded-lg shadow-sm p-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};