import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <div className='bg-dark text-light p-3 footer '>
      <h2 style={{ textAlign: "center" }}>
        E commerce Application &copy; SK Traders </h2>
        <p style={{textAlign:"center"}} className='mt-3'>
        <Link to='/about'>About</Link>| 
        <Link to='/contact'>Contact</Link>|
        <Link to='/policy'>Policy</Link>
        </p>
    </div>
  );
};

export default Footer;