import React, { useState, useEffect } from 'react'
import './home.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Widget from '../../components/widget/Widget'
import Chart from '../../components/chart/Chart'
import Featured from '../../components/featured/Featured'

const Home = () => {
  const [user, setUser] = useState(null);

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
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className='home'>
        <Sidebar />
        <div className="homecontainer">
          <Navbar />
          <div className="widgets">
            <Widget type="coins" user={user} />
            <Widget type="streak" user={user} />
            <Widget type="recycled" user={user} />
            <Widget type="carbon" user={user} />
            
          </div>
          <div className="charts">
            <Chart />
            <Featured />
          
          </div>

        </div>
    </div>
  )
}

export default Home