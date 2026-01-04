import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Context
import { AuthProvider, useAuth } from './context/AuthContext';

// Layout
import MainLayout from './components/layout/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WatchPage from './pages/WatchPage';
import NotFoundPage from './pages/NotFoundPage';

// --- Routing Logic Components ---

/**
 * Ensures the wrapped content is only displayed if the user is authenticated.
 * Redirects to /login otherwise. Requires AuthContext access.
 */
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show a basic loader while checking authentication status
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const App = () => {
  return (
    // Provide authentication context to the entire application
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* === Public Routes (Authentication) === */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* === Protected Routes (Main Content) === */}
          
          {/* Home Feed */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <HomePage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          
          {/* User Profile */}
          <Route
            path="/profile/:userId"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <ProfilePage />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          {/* Watch/Videos Page */}
          <Route
            path="/watch"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <WatchPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          
          {/* === 404 Route === */}
          <Route path="*" element={<NotFoundPage />} />
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;