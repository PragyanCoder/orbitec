import React, { useState } from 'react';
import { Save, Key, Bell, Shield, Trash2, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKey] = useState('orbit_sk_1234567890abcdef');
  
  const [settings, setSettings] = useState({
    // General settings
    timezone: 'UTC',
    language: 'en',
    
    // Notification settings
    emailNotifications: true,
    deploymentNotifications: true,
    billingNotifications: true,
    securityNotifications: true,
    
    // Security settings
    twoFactorEnabled: false,
    sessionTimeout: 30,
    
    // API settings
    webhookUrl: '',
    webhookSecret: ''
  });

  const tabs = [
    { id: 'general', name: 'General', icon: '⚙️' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'security', name: 'Security', icon: '🔒' },
    { id: 'api', name: 'API & Webhooks', icon: '🔗' },
    { id: 'danger', name: 'Danger Zone', icon: '⚠️' }
  ];

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // TODO: Implement actual save functionality
  };

  const generateNewApiKey = () => {
    console.log('Generating new API key');
    // TODO: Implement API key generation
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    // TODO: Show success message
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">General Preferences</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Timezone</label>
            <select
              value={settings.timezone}
              onChange={(e) => setSettings({...settings, timezone: e.target.value})}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="UTC">UTC</option>
              <option value="America/New_York">Eastern Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Los_Angeles">Pacific Time</option>
            </select>
          </div>
          
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Language</label>
            <select
              value={settings.language}
              onChange={(e) => setSettings({...settings, language: e.target.value})}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
        
        <div className="space-y-4">
          {[
            { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive email notifications for important events' },
            { key: 'deploymentNotifications', label: 'Deployment Updates', description: 'Get notified when deployments complete or fail' },
            { key: 'billingNotifications', label: 'Billing Alerts', description: 'Receive notifications about billing and payment issues' },
            { key: 'securityNotifications', label: 'Security Alerts', description: 'Get notified about security-related events' }
          ].map((notification) => (
            <div key={notification.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{notification.label}</h4>
                <p className="text-sm text-gray-500">{notification.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings[notification.key as keyof typeof settings] as boolean}
                  onChange={(e) => setSettings({...settings, [notification.key]: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
            </div>
            <Button variant={settings.twoFactorEnabled ? 'danger' : 'primary'}>
              {settings.twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
            </Button>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Session Timeout</h4>
            <p className="text-sm text-gray-500 mb-3">Automatically log out after period of inactivity</p>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => setSettings({...settings, sessionTimeout: parseInt(e.target.value)})}
                className="w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                min="5"
                max="480"
              />
              <span className="text-sm text-gray-500">minutes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderApiSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">API Access</h3>
        
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">API Key</h4>
            <p className="text-sm text-gray-500 mb-3">Use this key to authenticate API requests</p>
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={apiKey}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 font-mono text-sm"
                />
                <button
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <Button variant="secondary" onClick={copyApiKey}>
                Copy
              </Button>
              <Button variant="danger" onClick={generateNewApiKey}>
                Regenerate
              </Button>
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Webhooks</h4>
            <p className="text-sm text-gray-500 mb-3">Receive real-time notifications about events</p>
            <div className="space-y-3">
              <Input
                label="Webhook URL"
                placeholder="https://your-app.com/webhooks"
                value={settings.webhookUrl}
                onChange={(e) => setSettings({...settings, webhookUrl: e.target.value})}
              />
              <Input
                label="Webhook Secret"
                placeholder="Optional secret for webhook verification"
                value={settings.webhookSecret}
                onChange={(e) => setSettings({...settings, webhookSecret: e.target.value})}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDangerZone = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-red-900 mb-4">Danger Zone</h3>
        
        <div className="space-y-4">
          <div className="p-4 border border-red-200 rounded-lg bg-red-50">
            <h4 className="font-medium text-red-900 mb-2">Delete Account</h4>
            <p className="text-sm text-red-700 mb-3">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <Button variant="danger">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          </div>
          
          <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
            <h4 className="font-medium text-yellow-900 mb-2">Reset All Settings</h4>
            <p className="text-sm text-yellow-700 mb-3">
              Reset all settings to their default values. Your applications and data will not be affected.
            </p>
            <Button variant="secondary">
              Reset Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'api':
        return renderApiSettings();
      case 'danger':
        return renderDangerZone();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account preferences and security settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-3 text-sm font-medium rounded-none first:rounded-t-lg last:rounded-b-lg ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="mr-3">{tab.icon}</span>
                    {tab.name}
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-6">
              {renderTabContent()}
              
              {activeTab !== 'danger' && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Button onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};