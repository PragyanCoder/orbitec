import React, { useState } from 'react';
import { Plus, Globe, ExternalLink, Settings, Trash2, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

interface Domain {
  id: string;
  domain: string;
  applicationId: string;
  applicationName: string;
  status: 'active' | 'pending' | 'failed';
  sslStatus: 'active' | 'pending' | 'failed';
  createdAt: string;
  expiresAt?: string;
}

export const DomainsPage: React.FC = () => {
  const [domains, setDomains] = useState<Domain[]>([
    {
      id: '1',
      domain: 'myblog.com',
      applicationId: 'app1',
      applicationName: 'my-blog',
      status: 'active',
      sslStatus: 'active',
      createdAt: '2024-01-15T10:30:00Z',
      expiresAt: '2025-01-15T10:30:00Z'
    },
    {
      id: '2',
      domain: 'portfolio.dev',
      applicationId: 'app2',
      applicationName: 'portfolio-site',
      status: 'pending',
      sslStatus: 'pending',
      createdAt: '2024-01-15T11:00:00Z'
    }
  ]);

  const [showAddDomain, setShowAddDomain] = useState(false);
  const [newDomain, setNewDomain] = useState('');
  const [selectedApp, setSelectedApp] = useState('');

  // Mock applications
  const applications = [
    { id: 'app1', name: 'my-blog' },
    { id: 'app2', name: 'portfolio-site' },
    { id: 'app3', name: 'api-service' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddDomain = () => {
    if (!newDomain || !selectedApp) return;

    const newDomainObj: Domain = {
      id: Date.now().toString(),
      domain: newDomain,
      applicationId: selectedApp,
      applicationName: applications.find(app => app.id === selectedApp)?.name || '',
      status: 'pending',
      sslStatus: 'pending',
      createdAt: new Date().toISOString()
    };

    setDomains([...domains, newDomainObj]);
    setNewDomain('');
    setSelectedApp('');
    setShowAddDomain(false);
  };

  const handleDeleteDomain = (domainId: string) => {
    setDomains(domains.filter(domain => domain.id !== domainId));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Custom Domains</h1>
          <p className="text-gray-600">Manage custom domains for your applications</p>
        </div>
        <Button onClick={() => setShowAddDomain(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Domain
        </Button>
      </div>

      {/* Add Domain Modal */}
      {showAddDomain && (
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Add Custom Domain</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Domain Name"
              placeholder="example.com"
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
            />
            
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Application
              </label>
              <select
                value={selectedApp}
                onChange={(e) => setSelectedApp(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select an application</option>
                {applications.map((app) => (
                  <option key={app.id} value={app.id}>
                    {app.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2">DNS Configuration Required</h3>
              <p className="text-sm text-blue-800 mb-2">
                After adding your domain, you'll need to configure your DNS settings:
              </p>
              <div className="text-sm text-blue-800 space-y-1">
                <p>• Add a CNAME record pointing to: <code className="bg-blue-100 px-1 rounded">orbittechnology.tech</code></p>
                <p>• Or add an A record pointing to: <code className="bg-blue-100 px-1 rounded">192.168.1.100</code></p>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button onClick={handleAddDomain} disabled={!newDomain || !selectedApp}>
                Add Domain
              </Button>
              <Button variant="secondary" onClick={() => setShowAddDomain(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Domains List */}
      <div className="grid grid-cols-1 gap-6">
        {domains.map((domain) => (
          <Card key={domain.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Globe className="h-8 w-8 text-blue-600" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-semibold text-gray-900">{domain.domain}</h3>
                      <a
                        href={`https://${domain.domain}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                    <p className="text-sm text-gray-500">
                      Connected to {domain.applicationName}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-1">
                      {getStatusIcon(domain.status)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(domain.status)}`}>
                        {domain.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(domain.sslStatus)}
                      <span className="text-xs text-gray-500">
                        SSL: {domain.sslStatus}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteDomain(domain.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Added:</span>
                  <span className="ml-2 text-gray-900">{formatDate(domain.createdAt)}</span>
                </div>
                {domain.expiresAt && (
                  <div>
                    <span className="text-gray-500">Expires:</span>
                    <span className="ml-2 text-gray-900">{formatDate(domain.expiresAt)}</span>
                  </div>
                )}
                <div>
                  <span className="text-gray-500">Type:</span>
                  <span className="ml-2 text-gray-900">Custom Domain</span>
                </div>
              </div>

              {domain.status === 'pending' && (
                <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-sm text-yellow-800">
                    <strong>DNS Configuration Pending:</strong> Please configure your DNS settings to point to our servers.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        
        {domains.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Custom Domains</h3>
              <p className="text-gray-500 mb-6">
                Add a custom domain to make your application accessible via your own domain name.
              </p>
              <Button onClick={() => setShowAddDomain(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Domain
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Help Section */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Domain Configuration Help</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">CNAME Record (Recommended)</h3>
              <div className="bg-gray-50 rounded-lg p-3 text-sm">
                <p><strong>Type:</strong> CNAME</p>
                <p><strong>Name:</strong> @ (or your subdomain)</p>
                <p><strong>Value:</strong> orbittechnology.tech</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-2">A Record (Alternative)</h3>
              <div className="bg-gray-50 rounded-lg p-3 text-sm">
                <p><strong>Type:</strong> A</p>
                <p><strong>Name:</strong> @ (or your subdomain)</p>
                <p><strong>Value:</strong> 192.168.1.100</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            <p>
              <strong>Note:</strong> DNS changes can take up to 24 hours to propagate globally. 
              SSL certificates are automatically provisioned once DNS is configured correctly.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};