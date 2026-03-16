import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoanCalculator from './components/LoanCalculator';
import DepositCalculator from './components/DepositCalculator';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <Link to="/" className="nav-link">Loan Calculator</Link>
          <Link to="/deposit" className="nav-link">Deposit Calculator</Link>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<LoanCalculator />} />
            <Route path="/deposit" element={<DepositCalculator />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;