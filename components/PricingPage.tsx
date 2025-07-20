import React from 'react';
import { Check, Zap } from 'lucide-react';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import { Button } from './ui/Button';
import { Card, CardContent } from './ui/Card';

export const PricingPage: React.FC = () => {
  const plans = [
    {
      name: 'Starter',
      price: '$0',
      description: 'Perfect for getting started',
      features: [
        '1 Application',
        '100MB Storage',
        'Community Support',
        'Basic Analytics',
        'SSL Certificates'
      ],
      buttonText: 'Get Started',
      popular: false
    },
    {
      name: 'Pro',
      price: '$25',
      description: 'For growing applications',
      features: [
        '10 Applications',
        '10GB Storage',
        'Priority Support',
        'Advanced Analytics',
        'Custom Domains',
        'SSL Certificates',
        'Auto Scaling'
      ],
      buttonText: 'Start Pro',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$100',
      description: 'For large scale applications',
      features: [
        'Unlimited Applications',
        '100GB Storage',
        '24/7 Support',
        'Advanced Security',
        'Custom Domains',
        'Dedicated Resources',
        'SLA Guarantee'
      ],
      buttonText: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include our core deployment features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Zap className="h-4 w-4 mr-1" />
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardContent className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full" 
                  variant={plan.popular ? 'primary' : 'secondary'}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pay-as-you-go Credits</h2>
          <p className="text-gray-600 mb-6">
            Prefer flexibility? Use our credit system to pay only for what you use.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <Card>
              <CardContent className="text-center">
                <h3 className="font-semibold text-gray-900">$10 Credits</h3>
                <p className="text-gray-600">~2 months of hosting</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="text-center">
                <h3 className="font-semibold text-gray-900">$50 Credits</h3>
                <p className="text-gray-600">~10 months of hosting</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="text-center">
                <h3 className="font-semibold text-gray-900">$100 Credits</h3>
                <p className="text-gray-600">~20 months of hosting</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};