import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { CgSearch } from "react-icons/cg";

import ProfileButton from './ProfileButton';
import './NavBar.css';
import { GiConsoleController } from 'react-icons/gi';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  const stocks = useSelector(state => Object.values(state.stock));
  const location = useLocation();
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const searchFetch = async () => {
      if (searchInput) {
        // const response = await fetch(`https://cloud.iexapis.com/stable/search/${searchInput}?token=pk_b594792b9ef34e0e96c77e7d19984f80`);
        const response = await fetch(`https://sandbox.iexapis.com/stable/search/${searchInput}?token=Tpk_c924ab8d178f4d0681afac7b5eb34c34`);
        if (response.ok) {
          const searchResult = await response.json();
          setSearchResult(searchResult);
        }
      };
    }
    searchFetch();
  }, [searchInput])

  // const handleMeetClick = (e) => {
  //   const albumNav = document.querySelector("#meetDeveloper");
  //   albumNav.scrollIntoView({behavior: "smooth"})
  // }

  // USELOCATION TO SCROLL TO MEET DEVELOPER WHEN ON DIFFERENT PAGE//
  useEffect(()=> {
    if (location.hash) {
      let elem = document.getElementById(location.hash.slice(1));
      if (elem) {elem.scrollIntoView({behavior: "smooth"});};
    } else {
      window.scrollTo({top:0,left:0, behavior: "smooth"});
    };
  }, [location,]);

  return (
    <>
      {sessionUser ? (
        <nav className='navWrapper'>
          <div className='navContainer'>
            <div className='navLeft'>
              <NavLink to='/' exact={true} activeClassName='active'>
                <img className='navLogoImage' src={'https://wyl-greenarrow.s3.us-west-1.amazonaws.com/logo.png'} alt='GreenArrow Logo'></img>
              </NavLink>
            </div>
            <div className='navSearchBarContainer'>
              <label className='navSearchBarIcon'><CgSearch /></label>
              <input className='navSearchBar' id={searchInput.length>0?'NavSearchBarIncludesResult':''} placeholder='Search' type='text' onChange={e => {setSearchInput(e.target.value)}}></input>
              {/* <div className='navSearchBarIcon'><CgSearch /></div> */}
              {searchInput && <div className='navSearchBarResultContainer'>
                <div className='navSearchBarResultHeader'>Stocks</div>
                <div className='navSearchBarResult'>
                  {searchResult.map(stock => {
                    return (
                      <NavLink className='navSearchBarResultItemLink' key={stock.symbol} to={`/stocks/${stock.symbol}`} onClick={() => setSearchInput('')}>
                        <div className='navSearchBarResultItem'>{stock.symbol}</div>
                      </NavLink>
                    )
                  })}
                  {/* {stocks.filter(stock => {
                    if (searchInput === '') {return null}
                    else if (stock.symbol.toLowerCase().startsWith(searchInput.toLowerCase())) {return stock}
                    return null;
                  }).slice(0, 5).map(stock => {
                    return (
                      <div>{stock.symbol}</div>
                    )
                  })} */}
                </div>
              </div>}
            </div>
            <div className='navRight'>
              <a className='navJackLin' href='https://wylin94.github.io/'>Jack Lin</a>
              <a className='navGitHub' href='https://github.com/wylin94'>GitHub</a>
              <a className='navLinkedIn' href='https://www.linkedin.com/in/wylin94/'>LinkedIn</a>
              <NavLink className='navPortfolio' to='/' exact={true} activeClassName='active'>Portfolio</NavLink>
              <ProfileButton />
              {/* <NavLink to='/users' exact={true} activeClassName='active'>Users</NavLink> */}
            </div>
            
          </div>
        </nav>
      ) : (
        <nav className='splashNavWrapper'>
          <div className='splashNavContainer'>
            <div className='splashNavLeft'>
              <NavLink className='splashNavLogoContainer' to='/' exact={true} activeClassName='active'>
                <img className='splashNavLogoImage' src={'https://wyl-greenarrow.s3.us-west-1.amazonaws.com/logo.png'} alt='GreenArrow Logo'></img>
                <div className='splashNavLogoText'>GreenArrow</div>
              </NavLink>
              <a className='splashNavGitHub' href='https://github.com/wylin94'>GitHub</a>
              <a className='splashNavLinkedIn' href='https://www.linkedin.com/in/wylin94/'>LinkedIn</a>
              <NavLink className='splashNavMeet' to='/#meetDeveloper'>Meet the developer</NavLink>
            </div>
            <div className='splashNavRight'>
              <NavLink className='splashNavLogIn' to='/login' exact={true} activeClassName='active'>Log In</NavLink>
              <NavLink className='splashNavSignUp' to='/sign-up' exact={true} activeClassName='active'>Sign Up</NavLink>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}

export default NavBar;
