import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Shield, Scale, Users } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';

export const LegalPage: React.FC = () => {
  const legalDocuments = [
    {
      icon: FileText,
      title: 'Terms of Service',
      description: 'Our terms and conditions for using Orbit Technology services.',
      link: '/terms',
      lastUpdated: 'January 1, 2025'
    },
    {
      icon: Shield,
      title: 'Privacy Policy',
      description: 'How we collect, use, and protect your personal information.',
      link: '/privacy',
      lastUpdated: 'January 1, 2025'
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Legal Information</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Important legal documents and policies that govern your use of Orbit Technology services.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {legalDocuments.map((doc, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 rounded-lg p-2">
                  <doc.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{doc.title}</h3>
                  <p className="text-sm text-gray-500">Last updated: {doc.lastUpdated}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{doc.description}</p>
              <Link 
                to={doc.link}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Read Document →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900">Legal Department</h3>
              <p className="text-gray-600">
                For legal inquiries, compliance questions, or to report violations:
              </p>
              <p className="text-gray-600">
                Email: legal@orbittechnology.tech<br />
                Phone: +91 9519253125
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900">Business Address</h3>
              <p className="text-gray-600">
                ORBIT TECHNOLOGY<br />
                NO.2, RAGAVENDRA NAGAR, KURUMBAPET<br />
                Puducherry, Puducherry, 605009<br />
                India<br />
                GSTIN: 34AAFFO2987H1Z0
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">Compliance & Certifications</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Security Standards</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• SOC 2 Type II Compliant</li>
                  <li>• ISO 27001 Certified</li>
                  <li>• GDPR Compliant</li>
                  <li>• CCPA Compliant</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Industry Standards</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• PCI DSS Level 1</li>
                  <li>• HIPAA Ready</li>
                  <li>• FedRAMP Authorized</li>
                  <li>• CSA STAR Certified</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">Legal Updates</h2>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              We may update our legal documents from time to time. When we make significant changes, 
              we will notify you by:
            </p>
            <ul className="text-gray-600 space-y-2">
              <li>• Email notification to your registered email address</li>
              <li>• In-app notifications when you log in</li>
              <li>• Updates posted on this legal page</li>
              <li>• Banner notifications on our website</li>
            </ul>
            <p className="text-gray-600 mt-4">
              Continued use of our services after changes take effect constitutes acceptance of the 
              updated terms.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};