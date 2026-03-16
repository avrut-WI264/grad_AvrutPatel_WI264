import React, { useState } from 'react';

function DepositCalculator() {
    const [principal, setPrincipal] = useState('');
    const [rate, setRate] = useState('');
    const [years, setYears] = useState('');
    const [result, setResult] = useState(null);

    const handleCalculate = (e) => {
        e.preventDefault();
        
        const p = parseFloat(principal);
        const r = parseFloat(rate);
        const t = parseFloat(years);

        // Simple Fixed Deposit Compound Interest Formula (Compounded Annually)
        const maturityAmount = p * Math.pow((1 + r / 100), t);
        const totalInterest = maturityAmount - p;

        setResult({
            invested: p.toFixed(2),
            interest: totalInterest.toFixed(2),
            maturity: maturityAmount.toFixed(2)
        });
    };

    return (
        <form className="calculator-container" onSubmit={handleCalculate}>
            <h2>DEPOSIT CALCULATOR</h2>
            <hr />

            <div className="form-group">
                <label>Principal Amount (₹):</label>
                <input 
                    type="number" 
                    placeholder="Enter deposit amount" 
                    value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}
                    required 
                />
            </div>

            <div className="form-group">
                <label>Annual Interest Rate (%):</label>
                <input 
                    type="number" 
                    step="0.1"
                    placeholder="Enter interest rate" 
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    required 
                />
            </div>

            <div className="form-group">
                <label>Duration (Years):</label>
                <input 
                    type="number" 
                    placeholder="Enter duration in years" 
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                    required 
                />
            </div>

            <button type="submit">CALCULATE RETURNS</button>

            {result && (
                <div className="result-box">
                    <p><strong>Total Invested:</strong> ₹{result.invested}</p>
                    <p><strong>Total Interest:</strong> ₹{result.interest}</p>
                    <p><strong>Maturity Amount:</strong> ₹{result.maturity}</p>
                </div>
            )}
        </form>
    );
}

export default DepositCalculator;