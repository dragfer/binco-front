import React from 'react'
import './ownedcoupon.scss'

import QrCodeIcon from '@mui/icons-material/QrCode';


const Ownedcoupon = ({ownedcoupons}) => {
    
    
    
    return (
        <div className='ownedcoupon'>

            <img src={ownedcoupons.imageUrl} alt="coupon" />

            <div className="center">
                
                <div className="place">
                    <div className="info">
                        <h3>{ownedcoupons.title}</h3>
                        <p>{ownedcoupons.restaurant}</p>
                    </div>
                    
                </div>

                <div className="highs">
                    <span className='category'>{ownedcoupons.category}</span>
                    <span className='rating'>⭐{ownedcoupons.rating}</span>
                    
                </div>


                <div className="paid">
                    <span>Paid:</span>
                    <span className='coins'>
                        {ownedcoupons.coins} binCoins 
                    </span>

                </div>

                <div className="expy">
                    <span>Expiry:</span>
                    <span className='expiry'>{ownedcoupons.expiry}</span>
                </div>

                <button className="qr">
                    <QrCodeIcon className='icon' />
                    <span>Show QR Code</span>
                </button>
                
                
                
                
                
            </div>

            

            
        </div>
    )
}

export default Ownedcoupon