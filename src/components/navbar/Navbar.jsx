import React, { useState } from 'react'
import './navbar.scss';
import { Link } from 'react-router-dom';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';



const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.querySelector('.sidebar').classList.toggle('open');
  }



  return (
    <div className='navbar'>



      <div className="wrapper">

        <div className="hamburger" onClick={toggleMenu}>
          <MenuOpenIcon className='icon' />
        </div>
        <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
          <span className="logo-text">bin</span>
          <span className="logo-highlight">GO!</span>
        </Link>
      </div>
    </div>
  )
}

export default Navbar