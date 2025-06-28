import React, { useState } from 'react';
import './couponblock.scss';
import TollIcon from '@mui/icons-material/Toll';

const Couponblock = ({ coupons }) => {
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [error, setError] = useState(null);
  const [isRedeemed, setIsRedeemed] = useState(false);

  const handleRedeem = async () => {
    try {
      setIsRedeeming(true);
      setError(null);
      
      const response = await fetch(`http://192.168.20.233:5000/coupon/${coupons.id}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem('accessToken')}`,

        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 403 && errorData.message?.includes('insufficient coins')) {
          alert('Failed to redeem coupon: Insufficient coins');
          return;
        }
        throw new Error(errorData.message || 'Failed to redeem coupon');
      }

      const data = await response.json();
      console.log('Coupon redeemed successfully:', data);
      setIsRedeemed(true);
      
    } catch (err) {
      console.error('Error redeeming coupon:', err);
      // Only show non-insufficient-coin errors in the UI
      if (!err.message.includes('insufficient coins')) {
        setError(err.message || 'Failed to redeem coupon');
      }
    } finally {
      setIsRedeeming(false);
    }
  };

  return (
    <div className='couponblock'>
      <img src={coupons.image} alt="coupon" />

      <div className="center">
        <div className="left">
          <h3>{coupons.title}</h3>
          <p>{coupons.brand}</p>
        </div>
        <div className="right">
          <span className='category'>{coupons.category}</span>
          <span className='coins'>
            <TollIcon className='icon' />
            {coupons.coins} /-
          </span>
        </div>
      </div>

      <button 
        className='redeem' 
        onClick={handleRedeem}
        disabled={isRedeeming || isRedeemed}
      >
        {isRedeeming 
          ? 'Processing...' 
          : isRedeemed 
            ? 'Redeemed!' 
            : 'Redeem Now!'}
      </button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Couponblock;