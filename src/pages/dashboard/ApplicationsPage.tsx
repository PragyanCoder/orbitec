import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Play, 
  Square, 
  Trash2, 
  ExternalLink,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';

export const ApplicationsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with real data from API
  const applications = [
    {
      id: '1',
      name: 'my-blog',
      status: 'running',
      repoUrl: 'https://github.com/user/my-blog',
      subdomain: 'my-blog.orbit.tech',
      lastDeployment: '2 hours ago',
      createdAt: '2024-01-15',
      envVars: { NODE_ENV: 'production', API_URL: 'https://api.example.com' }
    },
    {
      id: '2',
      name: 'portfolio-site',
      status: 'building',
      repoUrl: 'https://github.com/user/portfolio',
      subdomain: 'portfolio-site.orbit.tech',
      lastDeployment: '5 minutes ago',
      createdAt: '2024-01-10',
      envVars: { NODE_ENV: 'production' }
    },
    {
      id: '3',
      name: 'api-service',
      status: 'stopped',
      repoUrl: 'https://github.com/user/api-service',
      subdomain: 'api-service.orbit.tech',
      lastDeployment: '1 day ago',
      createdAt: '2024-01-05',
      envVars: { NODE_ENV: 'production', DATABASE_URL: 'postgresql://...' }
    },
    {
      id: '4',
      name: 'e-commerce-app',
      status: 'failed',
      repoUrl: 'https://github.com/user/ecommerce',
      subdomain: 'ecommerce.orbit.tech',
      lastDeployment: '3 hours ago',
      createdAt: '2024-01-01',
      envVars: { NODE_ENV: 'production', STRIPE_KEY: 'sk_...' }
    }
  ];

  const filteredApplications = applications.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'building':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'stopped':
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-green-100 text-green-800';
      case 'building':
        return 'bg-yellow-100 text-yellow-800';
      case 'stopped':
        return 'bg-gray-100 text-gray-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAction = (action: string, appId: string) => {
    console.log(`${action} application ${appId}`);
    // TODO: Implement actual actions
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
          <p className="text-gray-600">Manage and deploy your applications</p>
        </div>
        <Link to="/dashboard/applications/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Application
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary">All Status</Button>
          <Button variant="secondary">Sort by Name</Button>
        </div>
      </div>

      {/* Applications Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredApplications.map((app) => (
          <Card key={app.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(app.status)}
                  <h3 className="font-semibold text-gray-900">{app.name}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(app.status)}`}>
                    {app.status}
                  </span>
                  <div className="relative">
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Subdomain</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-gray-900">{app.subdomain}</p>
                    <a 
                      href={`https://${app.subdomain}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Repository</p>
                  <a 
                    href={app.repoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 truncate block"
                  >
                    {app.repoUrl.replace('https://github.com/', '')}
                  </a>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Last deployment</p>
                  <p className="text-sm font-medium text-gray-900">{app.lastDeployment}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Environment variables</p>
                  <p className="text-sm font-medium text-gray-900">
                    {Object.keys(app.envVars).length} configured
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  {app.status === 'running' ? (
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={() => handleAction('stop', app.id)}
                    >
                      <Square className="h-3 w-3 mr-1" />
                      Stop
                    </Button>
                  ) : (
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={() => handleAction('start', app.id)}
                    >
                      <Play className="h-3 w-3 mr-1" />
                      Start
                    </Button>
                  )}
                  
                  <Link to={`/dashboard/applications/${app.id}`}>
                    <Button variant="secondary" size="sm" onClick={() => alert('Application details coming soon!')}>
                      View
                    </Button>
                  </Link>
                  
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => handleAction('delete', app.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredApplications.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <Search className="h-12 w-12" />
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No applications found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? 'Try adjusting your search terms.' : 'Get started by creating your first application.'}
          </p>
          {!searchTerm && (
            <div className="mt-6">
              <Link to="/dashboard/applications/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Application
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};