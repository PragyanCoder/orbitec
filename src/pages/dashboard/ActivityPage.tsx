import React, { useState, useEffect } from 'react';
import { Search, Activity, User, Rocket, CreditCard, Settings, Shield, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

interface ActivityLog {
  id: string;
  action: string;
  details: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  category: 'auth' | 'application' | 'billing' | 'security' | 'admin';
}

export const ActivityPage: React.FC = () => {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Mock data - replace with real API calls
  useEffect(() => {
    const mockActivities: ActivityLog[] = [
      {
        id: '1',
        action: 'application_deployed',
        details: 'Deployed application: my-blog',
        timestamp: '2024-01-15T10:30:00Z',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        category: 'application'
      },
      {
        id: '2',
        action: 'user_login',
        details: 'User logged in successfully',
        timestamp: '2024-01-15T09:15:00Z',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        category: 'auth'
      },
      {
        id: '3',
        action: 'credits_purchased',
        details: 'Purchased $100 credits',
        timestamp: '2024-01-14T16:45:00Z',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        category: 'billing'
      },
      {
        id: '4',
        action: 'application_stopped',
        details: 'Stopped application: api-service',
        timestamp: '2024-01-14T14:20:00Z',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        category: 'application'
      },
      {
        id: '5',
        action: 'payment_method_added',
        details: 'Added payment method ending in 4242',
        timestamp: '2024-01-13T11:30:00Z',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        category: 'billing'
      },
      {
        id: '6',
        action: 'profile_updated',
        details: 'Updated profile information',
        timestamp: '2024-01-12T08:15:00Z',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        category: 'auth'
      }
    ];

    setTimeout(() => {
      setActivities(mockActivities);
      setLoading(false);
    }, 1000);
  }, []);

  const categories = [
    { id: 'all', name: 'All Activities', icon: Activity },
    { id: 'auth', name: 'Authentication', icon: User },
    { id: 'application', name: 'Applications', icon: Rocket },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'admin', name: 'Admin', icon: Settings }
  ];

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || activity.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getActivityIcon = (category: string) => {
    switch (category) {
      case 'auth':
        return <User className="h-5 w-5 text-blue-500" />;
      case 'application':
        return <Rocket className="h-5 w-5 text-green-500" />;
      case 'billing':
        return <CreditCard className="h-5 w-5 text-purple-500" />;
      case 'security':
        return <Shield className="h-5 w-5 text-red-500" />;
      case 'admin':
        return <Settings className="h-5 w-5 text-orange-500" />;
      default:
        return <Activity className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getActionTitle = (action: string) => {
    return action.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Activity className="h-8 w-8 animate-pulse text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Activity Log</h1>
        <p className="text-gray-600">Monitor all activities and changes in your account</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex space-x-2 overflow-x-auto">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="whitespace-nowrap"
            >
              <category.icon className="h-4 w-4 mr-2" />
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="space-y-4">
        {filteredActivities.map((activity, index) => (
          <Card key={activity.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  {getActivityIcon(activity.category)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">
                      {getActionTitle(activity.action)}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {formatDate(activity.timestamp)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-1">
                    {activity.details}
                  </p>
                  
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span>IP: {activity.ipAddress}</span>
                    <span>•</span>
                    <span className="truncate max-w-xs">
                      {activity.userAgent.split(' ')[0]}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredActivities.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Activities Found</h3>
              <p className="text-gray-500">
                {searchTerm || selectedCategory !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Your activity log will appear here as you use the platform.'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Export Activity Log</h2>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Button variant="secondary">
              <Calendar className="h-4 w-4 mr-2" />
              Export Last 30 Days
            </Button>
            <Button variant="secondary">
              <Calendar className="h-4 w-4 mr-2" />
              Export All Activity
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Export your activity log as CSV or JSON for compliance and auditing purposes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};