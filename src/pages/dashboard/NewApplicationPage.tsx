import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Github, GitBranch, Settings, Rocket } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';

export const NewApplicationPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    repoUrl: '',
    branch: 'main',
    envVars: {} as Record<string, string>
  });
  const [envVarKey, setEnvVarKey] = useState('');
  const [envVarValue, setEnvVarValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const addEnvVar = () => {
    if (envVarKey && envVarValue) {
      setFormData(prev => ({
        ...prev,
        envVars: {
          ...prev.envVars,
          [envVarKey]: envVarValue
        }
      }));
      setEnvVarKey('');
      setEnvVarValue('');
    }
  };

  const removeEnvVar = (key: string) => {
    setFormData(prev => ({
      ...prev,
      envVars: Object.fromEntries(
        Object.entries(prev.envVars).filter(([k]) => k !== key)
      )
    }));
  };

  const handleDeploy = async () => {
    setLoading(true);
    
    // TODO: Implement actual deployment
    console.log('Deploying application:', formData);
    
    // Simulate deployment
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard/applications');
    }, 3000);
  };

  const isStepValid = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return formData.name && formData.repoUrl;
      case 2:
        return true; // Environment variables are optional
      default:
        return false;
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={() => navigate('/dashboard/applications')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Deploy New Application</h1>
          <p className="text-gray-600">Deploy your application in a few simple steps</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center space-x-4">
        <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
            1
          </div>
          <span className="font-medium">Repository</span>
        </div>
        <div className={`w-8 h-0.5 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
        <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
            2
          </div>
          <span className="font-medium">Configuration</span>
        </div>
        <div className={`w-8 h-0.5 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`} />
        <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
            3
          </div>
          <span className="font-medium">Deploy</span>
        </div>
      </div>

      {/* Step Content */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Github className="h-5 w-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Repository Configuration</h2>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Application Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="my-awesome-app"
              required
            />
            
            <Input
              label="GitHub Repository URL"
              name="repoUrl"
              value={formData.repoUrl}
              onChange={handleInputChange}
              placeholder="https://github.com/username/repository"
              required
            />
            
            <Input
              label="Branch"
              name="branch"
              value={formData.branch}
              onChange={handleInputChange}
              placeholder="main"
            />

            <div className="flex justify-end">
              <Button 
                onClick={() => setStep(2)}
                disabled={!isStepValid(1)}
              >
                Next: Configuration
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Settings className="h-5 w-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Environment Variables</h2>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Add environment variables that your application needs to run.
            </p>

            {/* Add Environment Variable */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Key"
                value={envVarKey}
                onChange={(e) => setEnvVarKey(e.target.value)}
                placeholder="NODE_ENV"
              />
              <Input
                label="Value"
                value={envVarValue}
                onChange={(e) => setEnvVarValue(e.target.value)}
                placeholder="production"
              />
            </div>
            
            <Button 
              variant="secondary" 
              onClick={addEnvVar}
              disabled={!envVarKey || !envVarValue}
            >
              Add Variable
            </Button>

            {/* Environment Variables List */}
            {Object.keys(formData.envVars).length > 0 && (
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Configured Variables</h3>
                {Object.entries(formData.envVars).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-medium text-gray-900">{key}</span>
                      <span className="text-gray-500 ml-2">= {value}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeEnvVar(key)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between">
              <Button variant="secondary" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={() => setStep(3)}>
                Next: Deploy
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Rocket className="h-5 w-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Ready to Deploy</h2>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <h3 className="font-medium text-gray-900">Deployment Summary</h3>
              <div className="text-sm text-gray-600">
                <p><strong>Application:</strong> {formData.name}</p>
                <p><strong>Repository:</strong> {formData.repoUrl}</p>
                <p><strong>Branch:</strong> {formData.branch}</p>
                <p><strong>Environment Variables:</strong> {Object.keys(formData.envVars).length} configured</p>
                <p><strong>Subdomain:</strong> {formData.name}.orbittechnology.tech</p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">What happens next?</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• We'll clone your repository</li>
                <li>• Build your application using Docker</li>
                <li>• Deploy to our secure infrastructure</li>
                <li>• Provide you with a live URL</li>
              </ul>
            </div>

            <div className="flex justify-between">
              <Button variant="secondary" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button onClick={handleDeploy} loading={loading}>
                {loading ? 'Deploying...' : 'Deploy Application'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};