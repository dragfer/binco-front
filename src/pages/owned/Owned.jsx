import React from 'react'
import './owned.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'

const Owned = () => {
  return (
    <div className='owned'>
      <Sidebar />
      <div className="ownedcontainer">
        <Navbar />

        <h2>Owned Coupons</h2>
        <p>Manage your purchased coupons here.</p>

        <div className="status">
          <div className="box">
            <h2 style={{ color: '#70e000' }}>2</h2>
            <p>Active</p>
          </div>
          <div className="box">
            <h2 style={{ color: 'red' }}>5</h2>
            <p>Expired</p>
          </div>
          <div className="box">
            <h2 style={{ color: '#ffaa00' }}>2</h2>
            <p>Redeemed</p>
          </div>
          <div className="box">
            <h2>23</h2>
            <p>Total</p>
          </div>
        </div>


        <div className="searchsec">
          <div className="search">
            <input type="text" placeholder='Search by coupon name' />
            <button>Search</button>
          </div>
          <div className="filter">
            <select name="filter" id="filter">
              <option value="">All coupons</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="redeemed">Redeemed</option>
            </select>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Owned