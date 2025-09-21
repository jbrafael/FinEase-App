import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import TransactionDashboard from './components/TransactionDashboard';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<TransactionDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 