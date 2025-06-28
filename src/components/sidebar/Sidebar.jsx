import React, { useState, useEffect } from 'react'
import './sidebar.scss'
import GridViewIcon from '@mui/icons-material/GridView';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ReceiptIcon from '@mui/icons-material/Receipt';
import RestoreIcon from '@mui/icons-material/Restore';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate, Link } from 'react-router-dom';

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://192.168.20.233:5000/user', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const closeSidebar = () => {
    document.querySelector('.sidebar')?.classList.remove('open');
  };

  const handleNavigation = (path) => {
    navigate(path);
    closeSidebar();
  };

  const handleLogout = async () => {
    try {
    document.cookie = "";

      
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className='sidebar'>
       
       <span className="close" onClick={closeSidebar}>
              <CancelIcon className='icon' />
       </span>
       
        <div className="top">
            <span className="logo">binGO!</span>
        </div>
        <div className="center">
            <ul>
                <p className="title">Main Menu</p>
                <li onClick={() => handleNavigation('/user/dashboard')}>
                    <GridViewIcon className='icon'/>
                    <span>Dashboard</span>
                </li>
                <li onClick={() => handleNavigation('/user/coupon')}>
                    <LocalOfferIcon className='icon' />
                    <span>Coupon Store</span>
                </li>
                <li onClick={() => handleNavigation('/user/owned')}>
                    <ReceiptIcon className='icon' />
                    <span>Owned Coupons</span>
                </li>
                <li onClick={() => handleNavigation('/user/history')}>
                    <RestoreIcon className='icon' />
                    <span>History</span>
                </li>

                <p className="title">Support</p>
                <li onClick={() => handleNavigation('/user/account')}>
                    <AccountBoxIcon className='icon' />
                    <span>Account</span>
                </li>
                <li onClick={() => handleNavigation('/user/help')}>
                    <HelpOutlineIcon className='icon' />
                    <span>Help Center</span>
                </li>

            </ul>
        </div>
        <div className="bottom">
            <div className="pfp">
                <img 
                    src={user?.profilePicture || "https://th.bing.com/th/id/OIP.Os3dloCTc-JUqOagtZOXVAHaHr?w=178&h=185&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3"}
                    alt="Profile"
                    className='avatar'
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://th.bing.com/th/id/OIP.Os3dloCTc-JUqOagtZOXVAHaHr?w=178&h=185&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3";
                    }}
                />
            </div>
            <div className="info">
                <span className="name">{user?.username || 'User'}</span>
                <span className="email">{user?.email || 'user@example.com'}</span>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
            </div>
        </div>
    </div>
  )
}

export default Sidebar