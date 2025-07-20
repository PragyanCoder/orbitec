import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useUser, useClerk } from '@clerk/clerk-react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { HomePage } from './pages/HomePage';
import { PricingPage } from './pages/PricingPage';
import { SignUpPage } from './pages/auth/SignUpPage';
import { SignInPage } from './pages/auth/SignInPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { ApplicationsPage } from './pages/dashboard/ApplicationsPage';
import { NewApplicationPage } from './pages/dashboard/NewApplicationPage';
import { DeploymentsPage } from './pages/dashboard/DeploymentsPage';
import { DomainsPage } from './pages/dashboard/DomainsPage';
import { ActivityPage } from './pages/dashboard/ActivityPage';
import { SettingsPage } from './pages/dashboard/SettingsPage';
import { ProfilePage } from './pages/dashboard/ProfilePage';
import { BillingPage } from './pages/dashboard/BillingPage';
import { DocumentationPage } from './pages/DocumentationPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/legal/PrivacyPage';
import { TermsPage } from './pages/legal/TermsPage';
import { LegalPage } from './pages/legal/LegalPage';
import { SitemapPage } from './pages/legal/SitemapPage';

function App() {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    await signOut();
  };

  // Transform Clerk user to our user format
  const transformedUser = isSignedIn && user ? {
    id: user.id,
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.emailAddresses[0]?.emailAddress || '',
    role: user.emailAddresses[0]?.emailAddress === 'pragyanpandey0106@gmail.com' ? 'admin' : 'user'
  } : null;

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={
            <>
              <Header user={transformedUser} onSignOut={handleSignOut} />
              <HomePage />
              <Footer />
            </>
          } />
          <Route path="/pricing" element={
            <>
              <Header user={transformedUser} onSignOut={handleSignOut} />
              <PricingPage />
              <Footer />
            </>
          } />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/contact" element={
            <>
              <Header user={transformedUser} onSignOut={handleSignOut} />
              <ContactPage />
              <Footer />
            </>
          } />
          <Route path="/docs" element={
            <>
              <Header user={transformedUser} onSignOut={handleSignOut} />
              <DocumentationPage />
              <Footer />
            </>
          } />
          <Route path="/privacy" element={
            <>
              <Header user={transformedUser} onSignOut={handleSignOut} />
              <PrivacyPage />
              <Footer />
            </>
          } />
          <Route path="/terms" element={
            <>
              <Header user={transformedUser} onSignOut={handleSignOut} />
              <TermsPage />
              <Footer />
            </>
          } />
          <Route path="/legal" element={
            <>
              <Header user={transformedUser} onSignOut={handleSignOut} />
              <LegalPage />
              <Footer />
            </>
          } />
          <Route path="/sitemap" element={
            <>
              <Header user={transformedUser} onSignOut={handleSignOut} />
              <SitemapPage />
              <Footer />
            </>
          } />

          {/* Dashboard routes - in production these would be protected */}
          <Route path="/dashboard" element={
            <DashboardLayout user={transformedUser || { id: '1', firstName: 'Demo', lastName: 'User', email: 'demo@example.com', role: 'user' }}>
              <DashboardPage />
            </DashboardLayout>
          } />
          <Route path="/dashboard/applications" element={
            <DashboardLayout user={transformedUser || { id: '1', firstName: 'Demo', lastName: 'User', email: 'demo@example.com', role: 'user' }}>
              <ApplicationsPage />
            </DashboardLayout>
          } />
          <Route path="/dashboard/applications/new" element={
            <DashboardLayout user={transformedUser || { id: '1', firstName: 'Demo', lastName: 'User', email: 'demo@example.com', role: 'user' }}>
              <NewApplicationPage />
            </DashboardLayout>
          } />
          <Route path="/dashboard/deployments" element={
            <DashboardLayout user={transformedUser || { id: '1', firstName: 'Demo', lastName: 'User', email: 'demo@example.com', role: 'user' }}>
              <DeploymentsPage />
            </DashboardLayout>
          } />
          <Route path="/dashboard/domains" element={
            <DashboardLayout user={transformedUser || { id: '1', firstName: 'Demo', lastName: 'User', email: 'demo@example.com', role: 'user' }}>
              <DomainsPage />
            </DashboardLayout>
          } />
          <Route path="/dashboard/activity" element={
            <DashboardLayout user={transformedUser || { id: '1', firstName: 'Demo', lastName: 'User', email: 'demo@example.com', role: 'user' }}>
              <ActivityPage />
            </DashboardLayout>
          } />
          <Route path="/dashboard/settings" element={
            <DashboardLayout user={transformedUser || { id: '1', firstName: 'Demo', lastName: 'User', email: 'demo@example.com', role: 'user' }}>
              <SettingsPage />
            </DashboardLayout>
          } />
          <Route path="/dashboard/profile" element={
            <DashboardLayout user={transformedUser || { id: '1', firstName: 'Demo', lastName: 'User', email: 'demo@example.com', role: 'user' }}>
              <ProfilePage />
            </DashboardLayout>
          } />
          <Route path="/dashboard/billing" element={
            <DashboardLayout user={transformedUser || { id: '1', firstName: 'Demo', lastName: 'User', email: 'demo@example.com', role: 'user' }}>
              <BillingPage />
            </DashboardLayout>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
