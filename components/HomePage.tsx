import React from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, Shield, Globe, Code, Rocket, CheckCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardContent } from './ui/Card';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';

interface HomePageProps {
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  } | null;
}

export const HomePage: React.FC<HomePageProps> = ({ user }) => {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast Deployments',
      description: 'Deploy your applications in seconds with our optimized Docker containers.'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Your applications are secured with industry-standard encryption and isolation.'
    },
    {
      icon: Globe,
      title: 'Global CDN',
      description: 'Reach users worldwide with our distributed content delivery network.'
    },
    {
      icon: Code,
      title: 'Multiple Languages',
      description: 'Support for Node.js, Python, Ruby, PHP, Go, and many more frameworks.'
    }
  ];

  const pricing = [
    {
      name: 'Starter',
      price: '$0',
      description: 'Perfect for getting started',
      features: [
        '1 Application',
        '100MB Storage',
        'Community Support',
        'Basic Analytics'
      ]
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
        'SSL Certificates'
      ],
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
        'Dedicated Resources'
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Header user={user} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Deploy Your Apps
              <span className="text-blue-600"> Instantly</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Build, deploy, and scale your applications with ease. From idea to production in minutes, 
              not hours. Experience the future of application deployment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sign-up">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/docs">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  View Documentation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Orbit Technology?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide everything you need to deploy and scale your applications with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent>
                  <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Deploy Your First App?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who trust Orbit Technology for their deployments.
          </p>
          <Link href="/sign-up">
            <Button size="lg" variant="secondary">
              Start Building Today
              <Rocket className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};