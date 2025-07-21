'use client';

import React from 'react';
import Link from 'next/link';
import { Rocket, User, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
import { useClerk, useUser } from '@clerk/nextjs';

interface HeaderProps {
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  } | null;
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  const { signOut, loaded } = useClerk();
  const { user: clerkUser } = useUser();

  const handleSignOut = () => {
    signOut(() => {
      window.location.href = '/';
    });
  };

  // Use Clerk user if available and no user prop passed
  const displayUser = user || (clerkUser ? {
    id: clerkUser.id,
    firstName: clerkUser.firstName || 'User',
    lastName: clerkUser.lastName || '',
    email: clerkUser.emailAddresses[0]?.emailAddress || 'user@example.com',
    role: 'user'
  } : null);

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Rocket className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Orbit Technology</span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link href="/pricing" className="text-gray-500 hover:text-gray-900">
              Pricing
            </Link>
            <Link href="/contact" className="text-gray-500 hover:text-gray-900">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {loaded && displayUser ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm">
                    Dashboard
                  </Button>
                </Link>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-700">{displayUser.firstName}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : loaded ? (
              <div className="flex items-center space-x-4">
                <Link href="/sign-in">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/sign-up">
                  <Button>Get Started</Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};