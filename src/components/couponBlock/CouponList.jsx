import React, { useState, useEffect } from 'react';
import Couponblock from './Couponblock';
import './couponlist.scss';
import Ownedcoupon from './Ownedcoupon';

export const CouponList = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await fetch('http://192.168.20.233:5000/coupon  ', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`,

          },
        });
        
        if (!response.ok) {
          console.log(response.status)
          throw new Error('Failed to fetch coupons');
        }
        
        const data = await response.json();
        setCoupons(Array.isArray(data.coupons) ? data.coupons : []);
      } catch (err) {
        console.error('Error fetching coupons:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  if (loading) {
    return <div className="loading">Loading available coupons...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="coupon-list">
      {coupons.length > 0 ? (
        coupons.map((coupon, idx) => (
          <Couponblock key={`${coupon.id || idx}`} coupons={coupon} />
        ))
      ) : (
        <div className="no-coupons">No coupons available at the moment.</div>
      )}
    </div>
  );
};

export const OwnedCouponList = ({ statusFilter = "" }) => {
  const [userCoupons, setUserCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserCoupons = async () => {
      try {
        const response = await fetch('http://192.168.20.233:5000/user', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        
        const userData = await response.json();
        setUserCoupons(Array.isArray(userData.coupons) ? userData.coupons : []);
      } catch (err) {
        console.error('Error fetching user coupons:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCoupons();
  }, []);

  // Filter coupons based on status if a filter is selected
  const filteredCoupons = statusFilter
    ? userCoupons.filter(coupon => 
        coupon.status && coupon.status.toLowerCase() === statusFilter.toLowerCase()
      )
    : userCoupons;

  if (loading) {
    return <div className="loading">Loading your coupons...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="owned-coupon-list">
      {filteredCoupons.length > 0 ? (
        filteredCoupons.map((coupon, idx) => (
          <Ownedcoupon key={`${coupon._id || idx}`} ownedcoupons={coupon} />
        ))
      ) : (
        <div className="no-coupons">
          {statusFilter 
            ? `No ${statusFilter} coupons found.` 
            : "You don't have any coupons yet."}
        </div>
      )}
    </div>
  );
};


