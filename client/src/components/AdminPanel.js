import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, updateDoc, addDoc, increment } from 'firebase/firestore';
import adminPanel from '../../src/styles/adminPanel.css';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
  measurementId: 'YOUR_MEASUREMENT_ID',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function AdminPanel() {
  const [balance, setBalance] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);

  useEffect(() => {
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
    addDoc(collection(db, 'payments'), {
      customerId: '123', // actual customer ID
      amount: amount,
    });

    const adminBalanceRef = doc(db, 'admin', 'balance');
    updateDoc(adminBalanceRef, {
      balance: increment(amount),
    });

    setBalance(balance + amount);
  };

  const handleWithdraw = () => {
    if (balance >= 50) {
      const adminBalanceRef = doc(db, 'admin', 'balance');
      updateDoc(adminBalanceRef, {
        balance: increment(-withdrawAmount),
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
