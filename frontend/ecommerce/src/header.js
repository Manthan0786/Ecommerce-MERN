import React from 'react';
import NavBar from './navigationpanel';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <header className="bg-black z-10 text-amber sticky top-0 left-0 right-0 flex justify-between 
      space-x-2 items-center w-full h-16">
        <Link to="/home" >
          <h1 className='text-white font-bold text-4xl hover:text-white hover:no-underline ml-4'>Ecommerce</h1>
        </Link>
        <NavBar></NavBar>
      </header>
    </>
  );
}

export default Header;