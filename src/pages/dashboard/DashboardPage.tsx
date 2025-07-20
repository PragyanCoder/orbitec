import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Rocket, 
  Globe, 
  Activity, 
  CreditCard, 
  Plus,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const DashboardPage: React.FC = () => {
  // Mock data - replace with real data from API
  const stats = {
    applications: 3,
    deployments: 12,
    credits: 150,
    uptime: '99.9%'
  };

  const recentApps = [
    {
      id: '1',
      name: 'my-blog',
      status: 'running',
      lastDeployment: '2 hours ago',
      url: 'my-blog.orbit.tech'
    },
    {
      id: '2',
      name: 'portfolio-site',
      status: 'building',
      lastDeployment: '5 minutes ago',
      url: 'portfolio-site.orbit.tech'
    },
    {
      id: '3',
      name: 'api-service',
      status: 'stopped',
      lastDeployment: '1 day ago',
      url: 'api-service.orbit.tech'
    }
  ];

  const recentActivity = [
    {
      id: '1',
      action: 'Deployed my-blog',
      timestamp: '2 hours ago',
      status: 'success'
    },
    {
      id: '2',
      action: 'Started portfolio-site build',
      timestamp: '5 minutes ago',
      status: 'pending'
    },
    {
      id: '3',
      action: 'Stopped api-service',
      timestamp: '1 day ago',
      status: 'info'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'building':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'stopped':
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getActivityIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Activity className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your applications.</p>
        </div>
        <Link to="/dashboard/applications/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Application
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Rocket className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Applications</p>
                <p className="text-2xl font-bold text-gray-900">{stats.applications}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Globe className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Deployments</p>
                <p className="text-2xl font-bold text-gray-900">{stats.deployments}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CreditCard className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Credits</p>
                <p className="text-2xl font-bold text-gray-900">${stats.credits}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Uptime</p>
                <p className="text-2xl font-bold text-gray-900">{stats.uptime}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Applications and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
              <Link to="/dashboard/applications">
                <Button variant="ghost" size="sm">View all</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApps.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(app.status)}
                    <div>
                      <p className="font-medium text-gray-900">{app.name}</p>
                      <p className="text-sm text-gray-500">{app.url}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Last deployment</p>
                    <p className="text-sm font-medium text-gray-900">{app.lastDeployment}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              <Button variant="ghost" size="sm" onClick={() => alert('Activity page coming soon!')}>View all</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3">
                  {getActivityIcon(activity.status)}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/dashboard/applications/new">
              <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Rocket className="h-8 w-8 text-blue-600 mb-2" />
                <h3 className="font-medium text-gray-900">Deploy New App</h3>
                <p className="text-sm text-gray-500">Create and deploy a new application</p>
              </div>
            </Link>

            <Link to="/dashboard/domains">
              <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Globe className="h-8 w-8 text-green-600 mb-2" />
                <h3 className="font-medium text-gray-900">Manage Domains</h3>
                <p className="text-sm text-gray-500">Configure custom domains</p>
              </div>
            </Link>

            <Link to="/dashboard/billing">
              <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <CreditCard className="h-8 w-8 text-purple-600 mb-2" />
                <h3 className="font-medium text-gray-900">Billing & Credits</h3>
                <p className="text-sm text-gray-500">Manage your billing and credits</p>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};