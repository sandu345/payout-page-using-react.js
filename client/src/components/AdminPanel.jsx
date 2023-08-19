import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { firestore } from './components/firebase.config';
import './styles/styles';

const db = firebase.firestore();

function AdminPanel() {
  const [balance, setBalance] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);

  useEffect(() => {
    // Fetch admin balance from Firestore
    const fetchBalance = async () => {
      const adminBalanceRef = db.collection('admin').doc('balance');
      const adminBalanceDoc = await adminBalanceRef.get();
      if (adminBalanceDoc.exists) {
        setBalance(adminBalanceDoc.data().balance);
      }
    };

    fetchBalance();
  }, []);

  const handleDeposit = (amount) => {
    
    db.collection('payments').add({
      customerId: '123', //  actual customer ID
      amount: amount,
    });

    // Update admin balance
    db.collection('admin').doc('balance').update({
      balance: firebase.firestore.FieldValue.increment(amount),
    });

    setBalance(balance + amount);
  };

  const handleWithdraw = () => {
    if (balance >= 50) {
      // Process withdrawal logic
      db.collection('admin').doc('balance').update({
        balance: firebase.firestore.FieldValue.increment(-withdrawAmount),
      });

      setBalance(balance - withdrawAmount);
      setWithdrawAmount(0);
    } else {
      alert('Withdrawal not allowed. Minimum balance not reached.');
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <p>Balance: ${balance}</p>

      <div>
        <h3>Collect Payment</h3>
        <CustomerPayment onDeposit={handleDeposit} />
      </div>

      <div>
        <h3>Withdraw Funds</h3>
        <p>Available Balance: ${balance}</p>
        <input
          type="number"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(parseInt(e.target.value))}
        />
        <button onClick={handleWithdraw}>Withdraw</button>
      </div>
    </div>
  );
}

function CustomerPayment({ onDeposit }) {
  const [paymentAmount, setPaymentAmount] = useState(0);

  const handlePayment = () => {
    // Process customer payment
    onDeposit(paymentAmount);
    setPaymentAmount(0);
  };

  return (
    <div>
      <input
        type="number"
        value={paymentAmount}
        onChange={(e) => setPaymentAmount(parseInt(e.target.value))}
      />
      <button onClick={handlePayment}>Pay</button>
    </div>
  );
}

export default AdminPanel;
