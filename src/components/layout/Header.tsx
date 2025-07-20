import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, User, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeaderProps {
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  } | null;
  onSignOut?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onSignOut }) => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Rocket className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Orbit Technology</span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link to="/pricing" className="text-gray-500 hover:text-gray-900">
              Pricing
            </Link>
            <Link to="/docs" className="text-gray-500 hover:text-gray-900">
              Documentation
            </Link>
            <Link to="/contact" className="text-gray-500 hover:text-gray-900">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm">
                    Dashboard
                  </Button>
                </Link>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-700">{user.firstName}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={onSignOut}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/sign-in">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/sign-up">
                  <Button>Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};