import React, { useEffect } from 'react';
import { useCoins } from '../../context/CoinsContext';
import './coinscounter.scss';
import TollIcon from '@mui/icons-material/Toll';

const Coinscounter = () => {
  const { coins, updateCoins } = useCoins();

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch('http://192.168.20.233:5000/user', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        const userData = await response.json();
        updateCoins(userData.coins);
      } catch (error) {
        console.error('Error fetching coins:', error);
      }
    };
    fetchCoins();
  }, [updateCoins]);

  return (
    <div className='coinscounter'>
      <TollIcon className='icon' />
      {coins}
      <span className='text'>Bincoins Available</span>
    </div>
  )
}

export default Coinscounter