import React, { useState } from 'react';

const loanTypes = {
    HOME: { interest: 9, minAmount: 500000, maxDuration: 30 },
    CAR: { interest: 12, minAmount: 100000, maxDuration: 7 },
    PERSONAL: { interest: 15, minAmount: 10000, maxDuration: 5 }
};

function LoanCalculator() {
    const [applicant, setApplicant] = useState('');
    const [loanType, setLoanType] = useState('');
    const [amount, setAmount] = useState('');
    const [duration, setDuration] = useState('');
    const [result, setResult] = useState(null);

    const handleCalculate = (e) => {
        e.preventDefault();

        if (!loanType) {
            alert("Please select a loan type.");
            return;
        }

        const typeData = loanTypes[loanType];
        const parsedAmount = parseFloat(amount);
        const parsedDuration = parseFloat(duration);

        if (parsedAmount <= typeData.minAmount) {
            alert(`Error: ${loanType} loan amount must be greater than ₹${typeData.minAmount.toLocaleString()}.`);
            return;
        }

        if (parsedDuration >= typeData.maxDuration) {
            alert(`Error: ${loanType} duration must be less than ${typeData.maxDuration} years.`);
            return;
        }

        const P = parsedAmount;
        const r = (typeData.interest / 12) / 100; 
        const n = parsedDuration * 12; 

        const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

        setResult({
            applicant,
            loanType,
            emi: emi.toFixed(2)
        });
    };

    const selectedTypeData = loanType ? loanTypes[loanType] : null;

    return (
        <form className="calculator-container" onSubmit={handleCalculate}>
            <h2>LOAN CALCULATOR</h2>
            <hr />

            <div className="form-group">
                <label>Applicant:</label>
                <input 
                    type="text" 
                    placeholder="Enter name" 
                    value={applicant}
                    onChange={(e) => setApplicant(e.target.value)}
                    required 
                />
            </div>

            <div className="form-group">
                <label>Type:</label>
                <div className="radio-group">
                    {Object.keys(loanTypes).map((type) => (
                        <React.Fragment key={type}>
                            <input 
                                type="radio" 
                                name="loanType" 
                                value={type} 
                                id={type.toLowerCase()} 
                                checked={loanType === type}
                                onChange={(e) => {
                                    setLoanType(e.target.value);
                                    setResult(null); 
                                }}
                                required 
                            /> 
                            <label htmlFor={type.toLowerCase()}>{type}</label>
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <div className="form-group">
                <label>Interest (%):</label>
                <input 
                    type="text" 
                    readOnly 
                    value={selectedTypeData ? `${selectedTypeData.interest}%` : ''}
                    placeholder="Select Type First" 
                />
            </div>

            <div className="form-group">
                <label>Amount:</label>
                <input 
                    type="number" 
                    placeholder="Enter amount" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required 
                />
                <small>
                    Min: {selectedTypeData ? `> ₹${selectedTypeData.minAmount.toLocaleString()}` : '-'}
                </small>
            </div>

            <div className="form-group">
                <label>Duration (Years):</label>
                <input 
                    type="number" 
                    placeholder="Enter years" 
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required 
                />
                <small>
                    Max: {selectedTypeData ? `< ${selectedTypeData.maxDuration} Years` : '-'}
                </small>
            </div>

            <button type="submit">CALCULATE EMI</button>

            {result && (
                <div className="result-box">
                    <p><strong>Applicant:</strong> {result.applicant}</p>
                    <p><strong>Loan Type:</strong> {result.loanType}</p>
                    <p><strong>Monthly EMI:</strong> ₹{result.emi}</p>
                </div>
            )}
        </form>
    );
}

export default LoanCalculator;