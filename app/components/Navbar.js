import React from 'react';
import Link from 'next/link';


const Navbar = () => {
  return (
    <nav style={{ backgroundColor: '#D4EE43' }}>
      <div className="logo">Givingly</div>
      <div className="links">
        <ul>
            <li>
                <Link href="/home" style={{ color: '#0A0A0A' }}>Home</Link>
            </li>
            <li>
                <Link href="/profile" style={{ color: '#0A0A0A' }}>Profile</Link>
            </li>
        <button className="new-project-btn"  
        style={{
            backgroundColor: '#0A0A0A',
            color: '#FFFFFF',
            borderRadius: '20px',
          }}>
          New Project
        </button>
        <button className="login-btn" 
        style={{
            backgroundColor: '#0A0A0A',
            color: '#FFFFFF',
            borderRadius: '20px',
          }}>
          Login
        </button>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
