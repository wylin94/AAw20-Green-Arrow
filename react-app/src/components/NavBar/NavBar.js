import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";

import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
      {sessionUser ? (
        <nav className='test'>
          <div className='navContainer'>
            <div className='navLeft'>
              <NavLink to='/' exact={true} activeClassName='active'>Green Arrow</NavLink>
              <div>Search Bar Here</div>
            </div>
            <div className='navRight'>
              <div>LinkedIn</div>
              <div>Github</div>
              <NavLink to='/' exact={true} activeClassName='active'>Portfolio</NavLink>
              <div>Account</div>
              <NavLink to='/users' exact={true} activeClassName='active'>Users</NavLink>
              <LogoutButton />
            </div>
          </div>
        </nav>
      ) : (
        <nav className='splashNavWrapper'>
          <div className='splashNavContainer'>
            <div className='splashNavLeft'>
              <NavLink to='/' exact={true} activeClassName='active'>Green Arrow</NavLink>
              <div>Products</div>
              <div>Who we are</div>
            </div>
            <div className='navRight'>
              <NavLink to='/login' exact={true} activeClassName='active'>Login</NavLink>
              <NavLink to='/sign-up' exact={true} activeClassName='active'>Sign Up</NavLink>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}

export default NavBar;
