import React from 'react'
import './history.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import SearchIcon from '@mui/icons-material/Search';
import TransactionBlock from '../../components/transblock/Transactionblock';
import { useState, useEffect } from 'react';

const History = () => {
    const [user, setUser] = useState(null);
    const [netEarned, setNetEarned] = useState(null);
    const [netSpent, setNetSpent] = useState(null);
    useEffect(() => {
        const fetchUser = async () => {
          try {
            const response = await fetch('http://192.168.20.233:5000/user/transactions', {
              method: 'GET',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`,

              },
            });
            const userData = await response.json();
            setUser(userData);
            // Process transactions after setting user
            const transactions = userData?.map(tx => ({
              type: tx.type === "credit" ? "recycling" : "purchase",
              description: tx.description,
              amount: tx.amount,
              date: tx.date
            })) || [];
            console.log(transactions);
            const netEarnedCalc = transactions
              .filter(tx => tx.type === "recycling")
              .reduce((total, tx) => total + tx.amount, 0);
              
            const netSpentCalc = transactions
              .filter(tx => tx.type === "purchase")
              .reduce((total, tx) => total + tx.amount, 0);
              
            setNetEarned(netEarnedCalc);
            setNetSpent(netSpentCalc);
          } catch (error) {
            console.error('Error fetching user:', error);
          }
        };
    
        fetchUser();
    }, []);
    
    const transactions = user?.map(tx => ({
      type: tx.type === "credit" ? "recycling" : "purchase",
      description: tx.description,
      amount: tx.amount,
      date: tx.date
    })) || [];

    return (
        <div className='history'>
            <Sidebar />
            <div className="historycontainer">
                <Navbar />

                <h2>Coupon History</h2>
                <p>View your coupon history here.</p>

                <div className="status">
                    <div className="box">
                        <h2 style={{ color: '#70e000' }}>{netEarned}</h2>
                        <p>Coins Earned</p>
                    </div>
                    <div className="box">
                        <h2 style={{ color: 'red' }}>{netSpent}</h2>
                        <p>Coins Spent</p>
                    </div>
                    <div className="box">
                        <h2 style={{ color: netEarned - netSpent >= 0 ? '#70e000' : 'red' }}>{netEarned - netSpent >= 0 ? netEarned - netSpent : netSpent-netEarned}</h2>
                        <p>Net Balance</p>
                    </div>

                </div>


                <div className="searchsec">
                    <div className="search">
                        <SearchIcon className='icon' />
                        <input type="text" placeholder="Search..." />
                    </div>
                    <div className="sorter">
                        <select
                            name="filter"
                            id="filter"

                        >
                            <option value="">All Types</option>
                            <option value="active">Earnings</option>
                            <option value="expired">Purchases</option>

                        </select>

                        <select
                            name="time"
                            id="time"

                        >
                            <option value="">All Time</option>
                            <option value="today">Today</option>
                            <option value="week">This week</option>
                            <option value="month">This month</option>
                            <option value="year">This year</option>
                        </select>


                    </div>
                </div>

                <div className="history-content">
                    <div className="top">
                        <h2 className='title'>Recent Transactions</h2>
                        <p>Your latest recycling and purchase activity</p>
                    </div>
                    <div className="bottom">
                        {transactions.map((transaction, index) => (
                            <TransactionBlock key={index} transaction={transaction} />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default History