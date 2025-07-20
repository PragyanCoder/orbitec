import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useUser, SignUp } from '@clerk/clerk-react';
import { Rocket } from 'lucide-react';

export const SignUpPage: React.FC = () => {
  const { isSignedIn } = useUser();

  // Redirect to dashboard if already signed in
  if (isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link to="/" className="flex items-center space-x-2">
            <Rocket className="h-12 w-12 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Orbit Technology</span>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/sign-in" className="font-medium text-blue-600 hover:text-blue-500">
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <SignUp 
            routing="path"
            path="/sign-up"
            redirectUrl="/dashboard"
            appearance={{
              elements: {
                formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-sm normal-case',
                card: 'shadow-none',
                headerTitle: 'hidden',
                headerSubtitle: 'hidden',
                socialButtonsBlockButton: 'border border-gray-300 hover:bg-gray-50',
                socialButtonsBlockButtonText: 'text-gray-700',
                dividerLine: 'bg-gray-300',
                dividerText: 'text-gray-500',
                formFieldLabel: 'text-gray-700 font-medium',
                formFieldInput: 'border-gray-300 focus:ring-blue-500 focus:border-blue-500',
                footerActionLink: 'text-blue-600 hover:text-blue-500'
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};