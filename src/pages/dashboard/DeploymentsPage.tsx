import React, { useState, useEffect } from 'react';
import { Search, Clock, CheckCircle, XCircle, AlertCircle, ExternalLink, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

interface Deployment {
  id: string;
  applicationId: string;
  applicationName: string;
  subdomain: string;
  status: 'pending' | 'building' | 'success' | 'failed';
  logs: string[];
  createdAt: string;
  buildTime?: number;
}

export const DeploymentsPage: React.FC = () => {
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDeployment, setSelectedDeployment] = useState<Deployment | null>(null);

  // Mock data - replace with real API calls
  useEffect(() => {
    const mockDeployments: Deployment[] = [
      {
        id: '1',
        applicationId: 'app1',
        applicationName: 'my-blog',
        subdomain: 'my-blog.orbittechnology.tech',
        status: 'success',
        logs: [
          '[2024-01-15 10:30:00] Starting deployment...',
          '[2024-01-15 10:30:05] Cloning repository...',
          '[2024-01-15 10:30:15] Installing dependencies...',
          '[2024-01-15 10:31:30] Building application...',
          '[2024-01-15 10:32:45] Deployment successful!'
        ],
        createdAt: '2024-01-15T10:30:00Z',
        buildTime: 135000
      },
      {
        id: '2',
        applicationId: 'app2',
        applicationName: 'portfolio-site',
        subdomain: 'portfolio-site.orbittechnology.tech',
        status: 'building',
        logs: [
          '[2024-01-15 11:00:00] Starting deployment...',
          '[2024-01-15 11:00:05] Cloning repository...',
          '[2024-01-15 11:00:15] Installing dependencies...'
        ],
        createdAt: '2024-01-15T11:00:00Z'
      },
      {
        id: '3',
        applicationId: 'app3',
        applicationName: 'api-service',
        subdomain: 'api-service.orbittechnology.tech',
        status: 'failed',
        logs: [
          '[2024-01-15 09:15:00] Starting deployment...',
          '[2024-01-15 09:15:05] Cloning repository...',
          '[2024-01-15 09:15:15] Installing dependencies...',
          '[2024-01-15 09:16:30] Error: Build failed - missing environment variable'
        ],
        createdAt: '2024-01-15T09:15:00Z',
        buildTime: 90000
      }
    ];

    setTimeout(() => {
      setDeployments(mockDeployments);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredDeployments = deployments.filter(deployment =>
    deployment.applicationName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'building':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'building':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Deployments</h1>
          <p className="text-gray-600">Monitor your application deployments and build logs</p>
        </div>
        <Button onClick={() => window.location.reload()}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search deployments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deployments List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Deployments</h2>
          {filteredDeployments.map((deployment) => (
            <Card 
              key={deployment.id} 
              className={`cursor-pointer transition-all ${
                selectedDeployment?.id === deployment.id ? 'ring-2 ring-blue-500' : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedDeployment(deployment)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(deployment.status)}
                    <div>
                      <h3 className="font-medium text-gray-900">{deployment.applicationName}</h3>
                      <p className="text-sm text-gray-500">{deployment.subdomain}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(deployment.status)}`}>
                    {deployment.status}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{formatDate(deployment.createdAt)}</span>
                  {deployment.buildTime && (
                    <span>Build time: {formatDuration(deployment.buildTime)}</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
          
          {filteredDeployments.length === 0 && (
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No deployments found</h3>
              <p className="text-gray-500">Try adjusting your search terms.</p>
            </div>
          )}
        </div>

        {/* Deployment Details */}
        <div>
          {selectedDeployment ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(selectedDeployment.status)}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {selectedDeployment.applicationName}
                      </h3>
                      <p className="text-sm text-gray-500">Deployment #{selectedDeployment.id}</p>
                    </div>
                  </div>
                  <a
                    href={`https://${selectedDeployment.subdomain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Deployment Info</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Status:</span>
                        <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedDeployment.status)}`}>
                          {selectedDeployment.status}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Started:</span>
                        <span className="ml-2 text-gray-900">{formatDate(selectedDeployment.createdAt)}</span>
                      </div>
                      {selectedDeployment.buildTime && (
                        <div>
                          <span className="text-gray-500">Duration:</span>
                          <span className="ml-2 text-gray-900">{formatDuration(selectedDeployment.buildTime)}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-gray-500">URL:</span>
                        <a
                          href={`https://${selectedDeployment.subdomain}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          {selectedDeployment.subdomain}
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Build Logs</h4>
                    <div className="bg-gray-900 rounded-lg p-4 max-h-64 overflow-y-auto">
                      <pre className="text-green-400 text-sm">
                        {selectedDeployment.logs.join('\n')}
                        {selectedDeployment.status === 'building' && (
                          <span className="animate-pulse">█</span>
                        )}
                      </pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Deployment</h3>
                <p className="text-gray-500">Choose a deployment from the list to view details and logs.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};