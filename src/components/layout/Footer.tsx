import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, GitlabIcon } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Orbit Technology</h3>
            <p className="text-gray-400 mb-4">
              Deploy your applications with ease. Scale without limits.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <GitlabIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
              <li><Link to="/docs" className="hover:text-white">Documentation</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link to="/legal" className="hover:text-white">Legal</Link></li>
              <li><Link to="/sitemap" className="hover:text-white">Sitemap</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 Orbit Technology. All rights reserved.</p>
          <p className="mt-2">Contact: admin@orbittechnology.tech | +91 9519253125</p>
          <p className="mt-1">GSTIN: 34AAFFO2987H1Z0 | Puducherry, India</p>
        </div>
      </div>
    </footer>
  );
};