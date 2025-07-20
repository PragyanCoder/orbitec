import React from 'react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
        <p className="mt-2 text-gray-600">Last updated: January 1, 2025</p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">Information We Collect</h2>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p>
              We collect information you provide directly to us, such as when you create an account, 
              deploy applications, or contact us for support.
            </p>
            <ul>
              <li>Account information (name, email address)</li>
              <li>Application data and deployment configurations</li>
              <li>Billing and payment information</li>
              <li>Usage data and analytics</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">How We Use Your Information</h2>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices and support messages</li>
              <li>Monitor and analyze usage patterns</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">Information Sharing</h2>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties 
              except as described in this policy.
            </p>
            <p>We may share your information:</p>
            <ul>
              <li>With service providers who assist in our operations</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and safety</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">Data Security</h2>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p>
              We implement appropriate security measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">Contact Us</h2>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p>
              Email: admin@orbittechnology.tech<br />
              Phone: +91 9519253125<br />
              Address: ORBIT TECHNOLOGY<br />
              NO.2, RAGAVENDRA NAGAR, KURUMBAPET<br />
              Puducherry, Puducherry, 605009, India<br />
              GSTIN: 34AAFFO2987H1Z0
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};