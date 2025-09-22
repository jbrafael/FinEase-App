import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import TransactionDashboard from './components/TransactionDashboard';
import AuthPage from './components/AuthPage';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<TransactionDashboard />} />
        <Route path="/auth" element={<AuthPage />} /> {/* Nova rota para autenticação */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;