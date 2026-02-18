import React, { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Context Providers
import { AuthProvider } from './contexts/AuthContext';
import { CommitmentProvider } from './contexts/CommitmentContext';
import { UIProvider } from './contexts/UIContext';
import { ProgressProvider } from './contexts/ProgressContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';

// Components
import { BottomTabBar } from './components/Navigation';
import { TopNavbar } from './components/Navigation';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { GuestRoute } from './components/auth/GuestRoute';
import { PageLoader } from './components/PageLoader';
import { ToastContainer } from './components/ToastContainer';

// Lazy-loaded Screens
const Splash = lazy(() => import('./screens/Splash'));
const Auth = lazy(() => import('./screens/Auth'));
const Onboarding = lazy(() => import('./screens/Onboarding'));
const ProfileSetup = lazy(() => import('./screens/ProfileSetup'));
const Home = lazy(() => import('./screens/Home'));
const ContractWizard = lazy(() => import('./screens/ContractWizard'));
const BondAuth = lazy(() => import('./screens/BondAuth'));
const ActiveSession = lazy(() => import('./screens/ActiveSession'));
const Penalty = lazy(() => import('./screens/Penalty'));
const Analytics = lazy(() => import('./screens/Analytics'));
const Wallet = lazy(() => import('./screens/Wallet'));
const Network = lazy(() => import('./screens/Network'));
const Profile = lazy(() => import('./screens/Profile'));

const Layout = ({ children }: { children?: React.ReactNode }) => {
  const location = useLocation();
  const hideNavRoutes = ['/', '/auth', '/onboarding', '/profile-setup', '/bond-auth', '/active-session', '/penalty'];
  const showNav = !hideNavRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen relative">
      {showNav && <TopNavbar />}
      <main className="flex-1 w-full max-w-[393px] mx-auto relative">
        {children}
      </main>
      {showNav && <BottomTabBar />}
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <UIProvider>
        <AuthProvider>
          <CommitmentProvider>
            <ProgressProvider>
              <SubscriptionProvider>
                <ToastContainer />
                <HashRouter>
                  <Layout>
                    <Suspense fallback={<PageLoader />}>
                      <AnimatePresence mode="wait">
                        <Routes>
                          {/* Public routes */}
                          <Route 
                            path="/" 
                            element={
                              <ErrorBoundary>
                                <Splash />
                              </ErrorBoundary>
                            } 
                          />
                          
                          {/* Guest-only routes (redirect to home if authenticated) */}
                          <Route 
                            path="/auth" 
                            element={
                              <ErrorBoundary>
                                <GuestRoute>
                                  <Auth />
                                </GuestRoute>
                              </ErrorBoundary>
                            } 
                          />
                          <Route 
                            path="/onboarding" 
                            element={
                              <ErrorBoundary>
                                <GuestRoute>
                                  <Onboarding />
                                </GuestRoute>
                              </ErrorBoundary>
                            } 
                          />
                          <Route 
                            path="/profile-setup" 
                            element={
                              <ErrorBoundary>
                                <GuestRoute>
                                  <ProfileSetup />
                                </GuestRoute>
                              </ErrorBoundary>
                            } 
                          />
                          
                          {/* Protected routes (require authentication) */}
                          <Route 
                            path="/home" 
                            element={
                              <ErrorBoundary>
                                <ProtectedRoute>
                                  <Home />
                                </ProtectedRoute>
                              </ErrorBoundary>
                            } 
                          />
                          <Route 
                            path="/contract" 
                            element={
                              <ErrorBoundary>
                                <ProtectedRoute>
                                  <ContractWizard />
                                </ProtectedRoute>
                              </ErrorBoundary>
                            } 
                          />
                          <Route 
                            path="/bond-auth" 
                            element={
                              <ErrorBoundary>
                                <ProtectedRoute>
                                  <BondAuth />
                                </ProtectedRoute>
                              </ErrorBoundary>
                            } 
                          />
                          <Route 
                            path="/active-session" 
                            element={
                              <ErrorBoundary>
                                <ProtectedRoute>
                                  <ActiveSession />
                                </ProtectedRoute>
                              </ErrorBoundary>
                            } 
                          />
                          <Route 
                            path="/penalty" 
                            element={
                              <ErrorBoundary>
                                <ProtectedRoute>
                                  <Penalty />
                                </ProtectedRoute>
                              </ErrorBoundary>
                            } 
                          />
                          <Route 
                            path="/analytics" 
                            element={
                              <ErrorBoundary>
                                <ProtectedRoute>
                                  <Analytics />
                                </ProtectedRoute>
                              </ErrorBoundary>
                            } 
                          />
                          <Route 
                            path="/wallet" 
                            element={
                              <ErrorBoundary>
                                <ProtectedRoute>
                                  <Wallet />
                                </ProtectedRoute>
                              </ErrorBoundary>
                            } 
                          />
                          <Route 
                            path="/network" 
                            element={
                              <ErrorBoundary>
                                <ProtectedRoute>
                                  <Network />
                                </ProtectedRoute>
                              </ErrorBoundary>
                            } 
                          />
                          <Route 
                            path="/profile" 
                            element={
                              <ErrorBoundary>
                                <ProtectedRoute>
                                  <Profile />
                                </ProtectedRoute>
                              </ErrorBoundary>
                            } 
                          />
                          
                          {/* Fallback */}
                          <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                      </AnimatePresence>
                    </Suspense>
                  </Layout>
                </HashRouter>
              </SubscriptionProvider>
            </ProgressProvider>
          </CommitmentProvider>
        </AuthProvider>
      </UIProvider>
    </ErrorBoundary>
  );
}