import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { MdLogout } from "react-icons/md";

import LogoutButton from '../auth/LogoutButton';
import './ProfileButton.css';

function ProfileButton() {
  const User = useSelector(state => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = () => {
      setShowMenu(false);
    };
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <div className='profileButtonWrapper'>
      <button className='profileButton' onClick={openMenu}>Account</button>
      {showMenu && (
        <div className='profileDropdownContainer'>
          <div className='profileDropdown'>

            <div className='profileDropdownName'>{User.username}</div>

            <div className='profileDropdownValueContainer'>
              <div className='profileDropdownPortfolioValue'>
                <div className='profileDropdownPortfolioValueAmount'>$1,000,000</div>
                <div className='profileDropdownPortfolioValueText'>Portfolio Value</div>
              </div>
              <div className='profileDropdownBuyingPower'>
                <div className='profileDropdownBuyingPowerAmount'>$1,000,000</div>
                <div className='profileDropdownBuyingPowerText'>Buying Power</div>
              </div>
            </div>
            <LogoutButton />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;