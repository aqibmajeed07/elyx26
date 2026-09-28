import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { useEvents } from './hooks/useEvents';
import { useRegistrations } from './hooks/useRegistrations';
import type { CulturalEvent } from './types';

// Layout & Core Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { RegistrationModal } from './components/registration/RegistrationModal';
import { AdminProtectedRoute } from './components/admin/AdminProtectedRoute';

// Immediate Load Critical Pages (Hero & Events Directory)
import { HomePage } from './pages/HomePage';
import { EventsPage } from './pages/EventsPage';

// Lazy Loaded Pages for Performance & Fast Initial Mobile Load
const EventDetailsPage = lazy(() =>
  import('./pages/EventDetailsPage').then((m) => ({ default: m.EventDetailsPage }))
);
const RulesPage = lazy(() =>
  import('./pages/RulesPage').then((m) => ({ default: m.RulesPage }))
);
const CoordinatorsPage = lazy(() =>
  import('./pages/CoordinatorsPage').then((m) => ({ default: m.CoordinatorsPage }))
);
const StudentRegistrationsPage = lazy(() =>
  import('./pages/StudentRegistrationsPage').then((m) => ({ default: m.StudentRegistrationsPage }))
);

// Admin Pages (Lazy Loaded)
const AdminLoginPage = lazy(() =>
  import('./pages/admin/AdminLoginPage').then((m) => ({ default: m.AdminLoginPage }))
);
const AdminDashboardPage = lazy(() =>
  import('./pages/admin/AdminDashboardPage').then((m) => ({ default: m.AdminDashboardPage }))
);
const AdminEventsPage = lazy(() =>
  import('./pages/admin/AdminEventsPage').then((m) => ({ default: m.AdminEventsPage }))
);
const AdminRegistrationsPage = lazy(() =>
  import('./pages/admin/AdminRegistrationsPage').then((m) => ({ default: m.AdminRegistrationsPage }))
);
const AdminCoordinatorsPage = lazy(() =>
  import('./pages/admin/AdminCoordinatorsPage').then((m) => ({ default: m.AdminCoordinatorsPage }))
);

// Loading Skeleton Fallback
const PageLoadingFallback: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[50vh] space-y-4">
    <div className="w-10 h-10 border-3 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
    <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
      Loading ELYX 26...
    </span>
  </div>
);

// Scroll to top helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Main App Inner layout
const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin') && location.pathname !== '/admin/login';

  const { events } = useEvents();
  const { registerForEvent } = useRegistrations();

  const [selectedEventForReg, setSelectedEventForReg] = useState<CulturalEvent | null>(null);
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);

  const handleOpenRegistration = (event: CulturalEvent) => {
    setSelectedEventForReg(event);
    setIsRegModalOpen(true);
  };

  const handleCloseRegistration = () => {
    setIsRegModalOpen(false);
    setSelectedEventForReg(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <ScrollToTop />

      {/* Public Navbar (Hidden on protected admin routes) */}
      {!isAdminPath && <Navbar />}

      <div className="flex-1">
        <Suspense fallback={<PageLoadingFallback />}>
          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={<HomePage events={events} onRegisterClick={handleOpenRegistration} />}
            />
            <Route
              path="/events"
              element={<EventsPage events={events} onRegisterClick={handleOpenRegistration} />}
            />
            <Route
              path="/events/:slug"
              element={<EventDetailsPage events={events} onRegisterClick={handleOpenRegistration} />}
            />
            <Route path="/rules" element={<RulesPage />} />
            <Route path="/coordinators" element={<CoordinatorsPage />} />
            <Route path="/my-registrations" element={<StudentRegistrationsPage />} />

            {/* Admin Authentication */}
            <Route path="/admin/login" element={<AdminLoginPage />} />

            {/* Protected Admin Console Routes */}
            <Route
              path="/admin"
              element={
                <AdminProtectedRoute>
                  <AdminDashboardPage />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin/events"
              element={
                <AdminProtectedRoute>
                  <AdminEventsPage />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin/registrations"
              element={
                <AdminProtectedRoute>
                  <AdminRegistrationsPage />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin/coordinators"
              element={
                <AdminProtectedRoute>
                  <AdminCoordinatorsPage />
                </AdminProtectedRoute>
              }
            />

            {/* Fallback 404 Route */}
            <Route
              path="*"
              element={
                <div className="max-w-md mx-auto py-20 text-center space-y-4">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Page Not Found</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">The requested page does not exist.</p>
                  <a href="/" className="btn-primary !text-xs !py-2.5">
                    Return Home
                  </a>
                </div>
              }
            />
          </Routes>
        </Suspense>
      </div>

      {/* Public Footer (Hidden on protected admin routes) */}
      {!isAdminPath && <Footer />}

      {/* Global Registration Modal */}
      <RegistrationModal
        event={selectedEventForReg}
        isOpen={isRegModalOpen}
        onClose={handleCloseRegistration}
        onSubmitRegistration={registerForEvent}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
