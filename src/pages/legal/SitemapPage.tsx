import React from 'react';
import { Link } from 'react-router-dom';
import { Home, User, CreditCard, Settings, Shield, FileText, Phone, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';

export const SitemapPage: React.FC = () => {
  const siteStructure = [
    {
      category: 'Main Pages',
      icon: Home,
      pages: [
        { name: 'Home', path: '/', description: 'Welcome to Orbit Technology' },
        { name: 'Pricing', path: '/pricing', description: 'View our pricing plans' },
        { name: 'Contact', path: '/contact', description: 'Get in touch with us' },
        { name: 'About', path: '/about', description: 'Learn about our company' }
      ]
    },
    {
      category: 'Authentication',
      icon: User,
      pages: [
        { name: 'Sign Up', path: '/sign-up', description: 'Create a new account' },
        { name: 'Sign In', path: '/sign-in', description: 'Access your account' }
      ]
    },
    {
      category: 'Dashboard',
      icon: Settings,
      pages: [
        { name: 'Dashboard', path: '/dashboard', description: 'Main dashboard overview' },
        { name: 'Applications', path: '/dashboard/applications', description: 'Manage your applications' },
        { name: 'New Application', path: '/dashboard/applications/new', description: 'Deploy a new application' },
        { name: 'Deployments', path: '/dashboard/deployments', description: 'View deployment history' },
        { name: 'Domains', path: '/dashboard/domains', description: 'Manage custom domains' },
        { name: 'Activity', path: '/dashboard/activity', description: 'View account activity' },
        { name: 'Settings', path: '/dashboard/settings', description: 'Account settings' },
        { name: 'Profile', path: '/dashboard/profile', description: 'Manage your profile' }
      ]
    },
    {
      category: 'Billing',
      icon: CreditCard,
      pages: [
        { name: 'Billing', path: '/dashboard/billing', description: 'Manage billing and credits' },
        { name: 'Payment Methods', path: '/dashboard/billing/payment-methods', description: 'Manage payment methods' },
        { name: 'Invoices', path: '/dashboard/billing/invoices', description: 'View billing history' }
      ]
    },
    {
      category: 'Admin Panel',
      icon: Shield,
      pages: [
        { name: 'Admin Dashboard', path: '/admin', description: 'Admin overview (Admin only)' },
        { name: 'User Management', path: '/admin/users', description: 'Manage users (Admin only)' },
        { name: 'Application Management', path: '/admin/applications', description: 'Manage all applications (Admin only)' },
        { name: 'Deployment Management', path: '/admin/deployments', description: 'View all deployments (Admin only)' },
        { name: 'Redeem Codes', path: '/admin/redeem-codes', description: 'Generate redeem codes (Admin only)' },
        { name: 'Activity Logs', path: '/admin/activity', description: 'View system activity (Admin only)' }
      ]
    },
    {
      category: 'Legal & Support',
      icon: FileText,
      pages: [
        { name: 'Legal', path: '/legal', description: 'Legal information hub' },
        { name: 'Terms of Service', path: '/terms', description: 'Our terms and conditions' },
        { name: 'Privacy Policy', path: '/privacy', description: 'How we handle your data' },
        { name: 'Service Level Agreement', path: '/sla', description: 'Our service commitments' },
        { name: 'Acceptable Use Policy', path: '/aup', description: 'Usage guidelines' },
        { name: 'Documentation', path: '/docs', description: 'API and platform documentation' },
        { name: 'Help Center', path: '/help', description: 'Get help and support' }
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Site Map</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Navigate through all pages and features available on the Orbit Technology platform.
        </p>
      </div>

      <div className="space-y-8">
        {siteStructure.map((section, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 rounded-lg p-2">
                  <section.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{section.category}</h2>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.pages.map((page, pageIndex) => (
                  <div key={pageIndex} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <Link to={page.path} className="block">
                      <h3 className="font-medium text-gray-900 mb-1">{page.name}</h3>
                      <p className="text-sm text-gray-600">{page.description}</p>
                      <p className="text-xs text-blue-600 mt-2">{page.path}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 rounded-lg p-2">
                <HelpCircle className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Need Help?</h2>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/docs" className="text-blue-600 hover:text-blue-800">
                      📚 Documentation
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-blue-600 hover:text-blue-800">
                      📧 Contact Support
                    </Link>
                  </li>
                  <li>
                    <Link to="/pricing" className="text-blue-600 hover:text-blue-800">
                      💰 View Pricing
                    </Link>
                  </li>
                  <li>
                    <Link to="/sign-up" className="text-blue-600 hover:text-blue-800">
                      🚀 Get Started
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Contact Information</h3>
                <div className="text-gray-600 space-y-1">
                  <p>📧 admin@orbittechnology.tech</p>
                  <p>📞 +91 9519253125</p>
                  <p>🏢 Puducherry, India</p>
                  <p>🕒 24/7 Support Available</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};