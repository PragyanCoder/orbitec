import React from 'react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
        <p className="mt-2 text-gray-600">Last updated: January 1, 2025</p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">Acceptance of Terms</h2>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p>
              By accessing and using Orbit Technology's services, you accept and agree to be bound by 
              the terms and provision of this agreement.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">Use License</h2>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p>
              Permission is granted to temporarily use Orbit Technology's services for personal and 
              commercial purposes. This is the grant of a license, not a transfer of title.
            </p>
            <p>Under this license you may not:</p>
            <ul>
              <li>Use the service for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the service</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">Service Availability</h2>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p>
              We strive to maintain high availability of our services, but we do not guarantee 
              uninterrupted access. We may suspend or terminate services for maintenance, 
              security, or other operational reasons.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">Payment Terms</h2>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p>
              Payment for services is required in advance. We accept major credit cards and 
              process payments through secure third-party providers.
            </p>
            <ul>
              <li>All fees are non-refundable unless otherwise stated</li>
              <li>Prices may change with 30 days notice</li>
              <li>Accounts may be suspended for non-payment</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">Limitation of Liability</h2>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p>
              In no event shall Orbit Technology be liable for any damages arising out of the use 
              or inability to use our services, even if we have been advised of the possibility 
              of such damages.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p>
              If you have any questions about these Terms of Service, please contact us at:
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