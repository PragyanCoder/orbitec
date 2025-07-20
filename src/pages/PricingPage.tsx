import React from 'react';
import { Link } from 'react-router-dom';
import { Check, X, Zap, Shield, Globe, Headphones } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';

export const PricingPage: React.FC = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for trying out our platform',
      features: [
        'Deploy with redeem codes only',
        '1 Application',
        '100MB Storage',
        'Community Support',
        'Basic Analytics',
        'Shared Resources'
      ],
      limitations: [
        'No payment method support',
        'Limited deployment time',
        'No custom domains'
      ],
      buttonText: 'Get Started Free',
      buttonVariant: 'secondary' as const,
      popular: false
    },
    {
      name: 'Pro',
      price: '$5',
      period: 'per app/month',
      description: 'For serious developers and small teams',
      features: [
        'Unlimited Applications',
        '10GB Storage per app',
        'Custom Domains',
        'SSL Certificates',
        'Priority Support',
        'Advanced Analytics',
        'Environment Variables',
        'Auto-scaling',
        'GitHub Integration',
        'Real-time Logs'
      ],
      limitations: [],
      buttonText: 'Start Pro Plan',
      buttonVariant: 'primary' as const,
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      description: 'For large teams and organizations',
      features: [
        'Everything in Pro',
        'Dedicated Resources',
        'Custom SLA',
        '24/7 Phone Support',
        'Advanced Security',
        'Team Management',
        'Audit Logs',
        'Custom Integrations',
        'On-premise Options',
        'Dedicated Account Manager'
      ],
      limitations: [],
      buttonText: 'Contact Sales',
      buttonVariant: 'secondary' as const,
      popular: false
    }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast Deployments',
      description: 'Deploy your applications in seconds with our optimized infrastructure.'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade security with isolated containers and encrypted data.'
    },
    {
      icon: Globe,
      title: 'Global CDN',
      description: 'Reach users worldwide with our distributed content delivery network.'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Get help when you need it with our dedicated support team.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Choose the plan that fits your needs. Start free with redeem codes, 
            then upgrade to Pro for just $5 per app per month.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-blue-800 font-medium">
              🎉 New users get $200 in free credits with redeem codes!
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-blue-600 shadow-lg' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-1 text-sm font-medium rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    {plan.period && (
                      <span className="text-gray-600 ml-2">/{plan.period}</span>
                    )}
                  </div>
                  <p className="text-gray-600 mt-2">{plan.description}</p>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">What's included:</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {plan.limitations.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Limitations:</h4>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, limitIndex) => (
                            <li key={limitIndex} className="flex items-start">
                              <X className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-600">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="pt-4">
                      <Link to={plan.name === 'Enterprise' ? '/contact' : '/sign-up'}>
                        <Button 
                          variant={plan.buttonVariant}
                          className="w-full"
                        >
                          {plan.buttonText}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Orbit Technology?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide everything you need to deploy and scale your applications with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How does the $5/month pricing work?</h3>
              <p className="text-gray-600 text-sm mb-4">
                You pay $5 per application per month. Each app runs in its own isolated container 
                with dedicated resources.
              </p>

              <h3 className="font-semibold text-gray-900 mb-2">What are redeem codes?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Redeem codes give you free credits to try our platform. New users can get $200 
                in credits to deploy and test applications.
              </p>

              <h3 className="font-semibold text-gray-900 mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-600 text-sm">
                Yes, you can stop or delete applications anytime. You're only charged for the 
                time your applications are running.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600 text-sm mb-4">
                We accept all major credit cards including Visa, MasterCard, and American Express 
                through Stripe.
              </p>

              <h3 className="font-semibold text-gray-900 mb-2">Do you offer refunds?</h3>
              <p className="text-gray-600 text-sm mb-4">
                We offer prorated refunds for unused time. Contact our support team for assistance.
              </p>

              <h3 className="font-semibold text-gray-900 mb-2">Is there a free trial?</h3>
              <p className="text-gray-600 text-sm">
                Yes! Use redeem codes to get free credits and try our platform without adding 
                a payment method.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Deploy Your First App?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of developers who trust Orbit Technology for their deployments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/sign-up">
              <Button size="lg" variant="secondary">
                Start Free with Redeem Code
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="ghost" className="text-white border-white hover:bg-white hover:text-blue-600">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};