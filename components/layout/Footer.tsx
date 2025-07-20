import React from 'react';
import Link from 'next/link';
import { Rocket } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Rocket className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">Orbit Technology</span>
            </div>
            <p className="text-gray-400 mb-4">
              Deploy your applications with ease. From idea to production in minutes.
            </p>
            <div className="text-sm text-gray-500">
              <p>ORBIT TECHNOLOGY</p>
              <p>NO.2, RAGAVENDRA NAGAR, KURUMBAPET</p>
              <p>Puducherry, Puducherry, 605009, India</p>
              <p>Contact: +91 9519253125</p>
              <p>GSTIN: 34AAFFO2987H1Z0</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
              <li><Link href="/docs" className="hover:text-white">Documentation</Link></li>
              <li><Link href="/contact" className="hover:text-white">Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link href="/legal" className="hover:text-white">Legal</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Orbit Technology. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};