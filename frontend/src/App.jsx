import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import TransactionDashboard from './pages/TransactionDashboard.jsx';
import AuthPage from './pages/AuthPage.jsx';
import { AuthProvider } from './providers/AuthProvider.jsx';  // Importando AuthProvider
import { useAuth } from './hooks/useAuth.js';
import './index.css';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>  {/* Colocando o BrowserRouter aqui */}
      <AuthProvider>  {/* AuthProvider agora está dentro do BrowserRouter */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <TransactionDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
