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
        { id: 'quick-start', title: 'Quick Start Guide' },
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
      case 'quick-start':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Quick Start Guide</h1>
            <p className="text-lg text-gray-600">
              Get your application deployed in minutes with Orbit Technology.
            </p>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">1. Sign Up</h2>
              <p className="text-gray-600">
                Create your account and get $200 in free credits to start deploying.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-900">2. Connect Repository</h2>
              <p className="text-gray-600">
                Link your GitHub repository containing your application code.
              </p>
              
              <CodeBlock
                id="git-clone"
                language="bash"
                code={`# Example repository structure
my-app/
├── package.json
├── src/
│   └── index.js
└── Dockerfile (optional)`}
              />
              
              <h2 className="text-2xl font-semibold text-gray-900">3. Deploy</h2>
              <p className="text-gray-600">
                Configure your environment variables and deploy with one click.
              </p>
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
            
            <h2 className="text-2xl font-semibold text-gray-900">Getting Your API Key</h2>
            <p className="text-gray-600">
              Generate an API key from your dashboard settings.
            </p>
            
            <CodeBlock
              id="auth-header"
              language="bash"
              code={`curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.orbittechnology.tech/v1/applications`}
            />
            
            <h2 className="text-2xl font-semibold text-gray-900">Response Format</h2>
            <CodeBlock
              id="auth-response"
              language="json"
              code={`{
  "success": true,
  "data": {
    "applications": [...]
  },
  "meta": {
    "total": 10,
    "page": 1
  }
}`}
            />
          </div>
        );
        
      case 'applications':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Applications API</h1>
            
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">List Applications</h2>
                <p className="text-gray-600 mb-4">Get all applications for the authenticated user.</p>
                <CodeBlock
                  id="list-apps"
                  language="bash"
                  code={`GET /api/applications
Authorization: Bearer YOUR_API_KEY`}
                />
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Create Application</h2>
                <CodeBlock
                  id="create-app"
                  language="bash"
                  code={`POST /api/applications
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY

{
  "name": "my-app",
  "repoUrl": "https://github.com/user/repo",
  "branch": "main",
  "envVars": {
    "NODE_ENV": "production"
  }
}`}
                />
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Deploy Application</h2>
                <CodeBlock
                  id="deploy-app"
                  language="bash"
                  code={`POST /api/applications/:id/deploy
Authorization: Bearer YOUR_API_KEY`}
                />
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Welcome to Orbit Technology Documentation</h1>
            <p className="text-lg text-gray-600">
              Everything you need to deploy and scale your applications.
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
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            {item.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
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