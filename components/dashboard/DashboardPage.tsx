import React from 'react';
import { Plus, Rocket, Activity, CreditCard } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';

interface DashboardPageProps {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ user }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user.firstName}!
          </h1>
          <p className="text-gray-600">Manage your applications and deployments</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Application
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="flex items-center">
            <Rocket className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Applications</p>
              <p className="text-2xl font-bold text-gray-900">0</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center">
            <Activity className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Deployments</p>
              <p className="text-2xl font-bold text-gray-900">0</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center">
            <CreditCard className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Credits</p>
              <p className="text-2xl font-bold text-gray-900">$0.00</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center">
            <div className="h-8 w-8 bg-gray-200 rounded-full mr-3 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">24h</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Uptime</p>
              <p className="text-2xl font-bold text-gray-900">100%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="secondary" className="justify-start">
              <Plus className="h-4 w-4 mr-2" />
              Deploy New App
            </Button>
            <Button variant="secondary" className="justify-start">
              <CreditCard className="h-4 w-4 mr-2" />
              Add Credits
            </Button>
            <Button variant="secondary" className="justify-start">
              <Activity className="h-4 w-4 mr-2" />
              View Logs
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="text-center py-8">
            <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No recent activity</p>
            <p className="text-sm text-gray-500">Deploy your first application to get started</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};