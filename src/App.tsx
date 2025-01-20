import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import MobileLayout from './components/MobileLayout';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import ArtworkDetails from './pages/ArtworkDetails';
import EditArtwork from './pages/EditArtwork';
import Messages from './pages/Messages';
import StudioVisits from './pages/StudioVisits';
import Commissions from './pages/Commissions';
import CommissionDetails from './pages/CommissionDetails';
import Invoices from './pages/Invoices';
import InvoiceDetails from './pages/InvoiceDetails';
import CRM from './pages/CRM';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuthStore } from './store';
import { supabase } from './lib/supabase';

export default function App() {
  const { user, setUser } = useAuthStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata.name,
          avatar: session.user.user_metadata.avatar_url,
        });
      }
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata.name,
          avatar: session.user.user_metadata.avatar_url,
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <div className="flex min-h-screen bg-white">
                  {/* Desktop Navigation */}
                  <div className="hidden md:block">
                    <Navigation />
                  </div>

                  {/* Desktop Content */}
                  <main className="flex-1 md:ml-64 md:p-8">
                    {/* Mobile Layout */}
                    <div className="md:hidden">
                      <MobileLayout>
                        <Routes>
                          <Route index element={<Dashboard />} />
                          <Route path="portfolio" element={<Portfolio />} />
                          <Route path="portfolio/:id" element={<ArtworkDetails />} />
                          <Route path="portfolio/edit/:id" element={<EditArtwork />} />
                          <Route path="studio-visits" element={<StudioVisits />} />
                          <Route path="commissions" element={<Commissions />} />
                          <Route path="commissions/:id" element={<CommissionDetails />} />
                          <Route path="invoices" element={<Invoices />} />
                          <Route path="invoices/:id" element={<InvoiceDetails />} />
                          <Route path="crm" element={<CRM />} />
                          <Route path="profile" element={<Profile />} />
                        </Routes>
                      </MobileLayout>
                    </div>

                    {/* Desktop Content */}
                    <div className="hidden md:block">
                      <Routes>
                        <Route index element={<Dashboard />} />
                        <Route path="portfolio" element={<Portfolio />} />
                        <Route path="portfolio/:id" element={<ArtworkDetails />} />
                        <Route path="portfolio/edit/:id" element={<EditArtwork />} />
                        <Route path="studio-visits" element={<StudioVisits />} />
                        <Route path="commissions" element={<Commissions />} />
                        <Route path="commissions/:id" element={<CommissionDetails />} />
                        <Route path="invoices" element={<Invoices />} />
                        <Route path="invoices/:id" element={<InvoiceDetails />} />
                        <Route path="crm" element={<CRM />} />
                        <Route path="profile" element={<Profile />} />
                      </Routes>
                    </div>
                  </main>
                </div>
              </ProtectedRoute>
            }
          />

          {/* Redirect root to login or dashboard */}
          <Route
            path="/"
            element={
              user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
            }
          />

          {/* Catch all other routes */}
          <Route
            path="*"
            element={
              user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}