import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
  // Mock user data - in production this would come from authentication
  const user = null; // Set to null to show signed-out state

  const handleSignOut = () => {
    console.log('Sign out');
    // In production, this would clear auth state
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={
            <>
              <Header user={user} onSignOut={handleSignOut} />
              <HomePage />
              <Footer />
            </>
          } />
          <Route path="/pricing" element={
            <>
              <Header user={user} onSignOut={handleSignOut} />
              <PricingPage />
              <Footer />
            </>
          } />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/contact" element={
            <>
              <Header user={user} onSignOut={handleSignOut} />
              <ContactPage />
              <Footer />
            </>
          } />
          <Route path="/docs" element={
            <>
              <Header user={user} onSignOut={handleSignOut} />
              <DocumentationPage />
              <Footer />
            </>
          } />
          <Route path="/privacy" element={
            <>
              <Header user={user} onSignOut={handleSignOut} />
              <PrivacyPage />
              <Footer />
            </>
          } />
          <Route path="/terms" element={
            <>
              <Header user={user} onSignOut={handleSignOut} />
              <TermsPage />
              <Footer />
            </>
          } />
          <Route path="/legal" element={
            <>
              <Header user={user} onSignOut={handleSignOut} />
              <LegalPage />
              <Footer />
            </>
          } />
          <Route path="/sitemap" element={
            <>
              <Header user={user} onSignOut={handleSignOut} />
              <SitemapPage />
              <Footer />
            </>
          } />

          {/* Dashboard routes - in production these would be protected */}
          <Route path="/dashboard" element={
            <DashboardLayout user={user || { id: '1', firstName: 'Demo', lastName: 'User', email: 'demo@example.com', role: 'user' }}>
              <DashboardPage />
            </DashboardLayout>
          } />
          <Route path="/dashboard/applications" element={
            <DashboardLayout user={user || { id: '1', firstName: 'Demo', lastName: 'User', email: 'demo@example.com', role: 'user' }}>
              <ApplicationsPage />
            </DashboardLayout>
          } />
          <Route path="/dashboard/applications/new" element={
            <DashboardLayout user={user || { id: '1', firstName: 'Demo', lastName: 'User', email: 'demo@example.com', role: 'user' }}>
              <NewApplicationPage />
            </DashboardLayout>
          } />
          <Route path="/dashboard/deployments" element={
            <DashboardLayout user={user || { id: '1', firstName: 'Demo', lastName: 'User', email: 'demo@example.com', role: 'user' }}>
              <DeploymentsPage />
            </DashboardLayout>
          } />
          <Route path="/dashboard/domains" element={
            <DashboardLayout user={user || { id: '1', firstName: 'Demo', lastName: 'User', email: 'demo@example.com', role: 'user' }}>
              <DomainsPage />
            </DashboardLayout>
          } />
          <Route path="/dashboard/activity" element={
            <DashboardLayout user={user || { id: '1', firstName: 'Demo', lastName: 'User', email: 'demo@example.com', role: 'user' }}>
              <ActivityPage />
            </DashboardLayout>
          } />
          <Route path="/dashboard/settings" element={
            <DashboardLayout user={user || { id: '1', firstName: 'Demo', lastName: 'User', email: 'demo@example.com', role: 'user' }}>
              <SettingsPage />
            </DashboardLayout>
          } />
          <Route path="/dashboard/profile" element={
            <DashboardLayout user={user || { id: '1', firstName: 'Demo', lastName: 'User', email: 'demo@example.com', role: 'user' }}>
              <ProfilePage />
            </DashboardLayout>
          } />
          <Route path="/dashboard/billing" element={
            <DashboardLayout user={user || { id: '1', firstName: 'Demo', lastName: 'User', email: 'demo@example.com', role: 'user' }}>
              <BillingPage />
            </DashboardLayout>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
