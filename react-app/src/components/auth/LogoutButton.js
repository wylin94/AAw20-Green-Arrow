import React from 'react';
import { useDispatch } from 'react-redux';
import { MdLogout } from "react-icons/md";

import { logout } from '../../store/session';
import './LogoutButton.css';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <button className='logoutButton' onClick={onLogout}><MdLogout /><div className='logoutButtonText'>Log out</div></button>;
};

export default LogoutButton;
