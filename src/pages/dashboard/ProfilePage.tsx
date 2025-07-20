import React, { useState } from 'react';
import { Save, Upload, User, Mail, Calendar, MapPin, Building } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState({
    firstName: 'Demo',
    lastName: 'User',
    email: 'demo@example.com',
    company: 'Acme Corp',
    jobTitle: 'Software Engineer',
    location: 'San Francisco, CA',
    bio: 'Full-stack developer passionate about building scalable applications.',
    website: 'https://example.com',
    twitter: '@demouser',
    github: 'demouser',
    linkedin: 'demouser'
  });

  const [avatar, setAvatar] = useState('/api/placeholder/150/150');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    
    // TODO: Implement actual save functionality
    console.log('Saving profile:', profile);
    
    setTimeout(() => {
      setLoading(false);
      // Show success message
    }, 2000);
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600">Manage your personal information and public profile</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Profile Picture</h2>
            </CardHeader>
            <CardContent className="text-center">
              <div className="relative inline-block">
                <img
                  src={avatar}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
                />
                <label className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-colors">
                  <Upload className="h-4 w-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Click the upload button to change your profile picture. 
                Recommended size: 400x400px.
              </p>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="mt-6">
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Account Stats</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Member since</span>
                  <span className="font-medium">Jan 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Applications</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Deployments</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Credits</span>
                  <span className="font-medium">$150</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  value={profile.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="John"
                />
                <Input
                  label="Last Name"
                  value={profile.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Doe"
                />
              </div>

              <Input
                label="Email Address"
                type="email"
                value={profile.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="john@example.com"
              />

              {/* Professional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Company"
                  value={profile.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder="Acme Corp"
                />
                <Input
                  label="Job Title"
                  value={profile.jobTitle}
                  onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                  placeholder="Software Engineer"
                />
              </div>

              <Input
                label="Location"
                value={profile.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="San Francisco, CA"
              />

              {/* Bio */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Bio
                </label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={4}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tell us about yourself..."
                />
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Social Links</h3>
                
                <Input
                  label="Website"
                  value={profile.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://yourwebsite.com"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="Twitter"
                    value={profile.twitter}
                    onChange={(e) => handleInputChange('twitter', e.target.value)}
                    placeholder="@username"
                  />
                  <Input
                    label="GitHub"
                    value={profile.github}
                    onChange={(e) => handleInputChange('github', e.target.value)}
                    placeholder="username"
                  />
                  <Input
                    label="LinkedIn"
                    value={profile.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                    placeholder="username"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-6 border-t border-gray-200">
                <Button onClick={handleSave} loading={loading}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};