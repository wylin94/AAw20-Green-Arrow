import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AiFillDollarCircle } from "react-icons/ai";
import { GiPartyPopper } from "react-icons/gi";
import { FaDonate } from "react-icons/fa";
import { BiDonateHeart } from "react-icons/bi";



import LogoutButton from '../auth/LogoutButton';
import { buyingPower } from '../../store/session';
import './ProfileButton.css';

function ProfileButton() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const user_id = user.id;
  const cash = (user.buying_power > 0) ? false : true;

  const stocks = useSelector(state => Object.values(state.stock));
  const findStockPrice = ticker => {
		const stock = stocks?.find(stock => stock.symbol === ticker);
		return (stock?.askPrice !== 0) ? stock?.askPrice:stock?.lastSalePrice;
	}

  const portfolios = useSelector(state => state.portfolio.portfolios?.filter(ele => ele.user_id === user.id));
	const portfoliosRunningBalance = portfolios?.reduce((a, b) => a + (findStockPrice(b.ticker) * b.share), 0);
  const [showMenu, setShowMenu] = useState(false);
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const handleShowMeTheMillionSubmit = async (e) => {
    e.preventDefault();
    const new_buying_power = user.buying_power + 1000000;
    await dispatch(buyingPower({user_id, new_buying_power}));
  }

  const handleSurpriseSubmit = async (e) => {
    e.preventDefault();
    const new_buying_power = user.buying_power + Math.floor(Math.random() * 1000000);
    await dispatch(buyingPower({user_id, new_buying_power}));
  }

  const handleImTooRichSubmit = async (e) => {
    e.preventDefault();
    const new_buying_power = 0;
    await dispatch(buyingPower({user_id, new_buying_power}));
  }
  
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

            <div className='profileDropdownName'>{user.username}</div>

            <div className='profileDropdownValueContainer'>
              <div className='profileDropdownPortfolioValue'>
                <div className='profileDropdownPortfolioValueAmount'>${(user.buying_power + portfoliosRunningBalance).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                <div className='profileDropdownPortfolioValueText'>Portfolio Value</div>
              </div>
              <div className='profileDropdownBuyingPower'>
                <div className='profileDropdownBuyingPowerAmount'>${user.buying_power?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                <div className='profileDropdownBuyingPowerText'>Buying Power</div>
              </div>
            </div>
            <button className='profileDropdownButton' id='showMeTheMillion' onClick={handleShowMeTheMillionSubmit}><AiFillDollarCircle /><div className='profileDropdownText'>Show Me the Million</div></button>
            <button className='profileDropdownButton' onClick={handleSurpriseSubmit}><GiPartyPopper /><div className='profileDropdownText'>Surprise Me!</div></button>
            <button className='profileDropdownButton' disabled={cash} onClick={handleImTooRichSubmit}><BiDonateHeart /><div className='profileDropdownText'>I am too rich, donate all my cash</div></button>
            <LogoutButton />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;