import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillDollarCircle } from "react-icons/ai";
import { GiPartyPopper } from "react-icons/gi";
import { BiDonateHeart } from "react-icons/bi";
import { BsFillEmojiSmileFill } from "react-icons/bs";

import LogoutButton from '../auth/LogoutButton';
import { buyingPower } from '../../store/session';
import { createPortfolio } from '../../store/portfolio';
import { Modal } from '../../context/Modal';
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
  const [showMillionModal, setShowMillionModal] = useState(false);
  const [showSurpriseMeModal, setShowSurpriseMeModal] = useState(false);
  const [showTooRichModal, setShowTooRichModal] = useState(false);
  const [randomTicker, setRandomTicker] = useState('');
  const [randomShare, setRandomShare] = useState(0);
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const handleShowMeTheMillionSubmit = async (e) => {
    e.preventDefault();
    const new_buying_power = user.buying_power + 1000000;
    const millionDollar = await dispatch(buyingPower({user_id, new_buying_power}));
    if (millionDollar) {
      setShowMillionModal(true);
    };
  };

  // const handleSurpriseSubmit = async (e) => {
  //   e.preventDefault();
  //   const new_buying_power = user.buying_power + Math.floor(Math.random() * 1000000);
  //   const response = await dispatch(buyingPower({user_id, new_buying_power}));
  //   if (response.ok) {
  //     setShowSurpriseMeModal(true);
  //   };
  // };

  // RANDOMIZED TICKER AND SHARE FOR SURPRISE BUTTON //


  const handleSurpriseSubmit = async (e) => {
    e.preventDefault();
    const ticker = stocks[Math.floor(Math.random() * stocks.length)]?.symbol;
    const share = Math.floor(Math.random() * 100);
    const purchase_price = 1;
    const randomStock = await dispatch(createPortfolio({user_id, ticker, share, purchase_price}));
    if (randomStock) {
      setRandomShare(share);
      setRandomTicker(ticker);
      setShowSurpriseMeModal(true);
    };
  };

  const handleImTooRichSubmit = async (e) => {
    e.preventDefault();
    const new_buying_power = 0;
    const donate = await dispatch(buyingPower({user_id, new_buying_power}));
    if (donate) {
      setShowTooRichModal(true);
    };
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
            <div className='profileDropdownName'>{user.username}</div>
            <div className='profileDropdownValueContainer'>
              <div className='profileDropdownPortfolioValue'>
                <div className='profileDropdownPortfolioValueAmount'>${(user.buying_power + portfoliosRunningBalance)?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                <div className='profileDropdownPortfolioValueText'>Portfolio Value</div>
              </div>
              <div className='profileDropdownBuyingPower'>
                <div className='profileDropdownBuyingPowerAmount'>${user.buying_power?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                <div className='profileDropdownBuyingPowerText'>Buying Power</div>
              </div>
            </div>
            <NavLink className='profileDropdownButton' id='profileDropdownButton-profile' to='/profile'>
              <BsFillEmojiSmileFill /><div className='profileDropdownText'>Profile</div>
            </NavLink>
            <button className='profileDropdownButton' id='showMeTheMillion' onClick={handleShowMeTheMillionSubmit}>
              <AiFillDollarCircle /><div className='profileDropdownText'>Show Me the Million</div>
            </button>
            <button className='profileDropdownButton' onClick={handleSurpriseSubmit}>
              <GiPartyPopper /><div className='profileDropdownText'>Surprise Me!</div>
            </button>
            <button className='profileDropdownButton' disabled={cash} onClick={handleImTooRichSubmit}>
              <BiDonateHeart /><div className='profileDropdownText'>I am too rich, donate all my cash</div>
            </button>
            <LogoutButton />
          </div>
        </div>
      )}
      {showMillionModal && (
        <Modal onClose={() => setShowMillionModal(false)}>
          <div className='profileDropdownModalContainer'>
            <div>
              <div className='profileDropdownModalHeader'>Congratulations</div>
              <div className='profileDropdownModalBody'>We've created a million dollars out of thin air and added to your account, please invest responsibly.</div>
            </div>
            <button className='profileDropdownModalCloseButton' onClick={() => {setShowMillionModal(false)}}>Got it</button>
          </div>
        </Modal>
      )}
      {showSurpriseMeModal && (
        <Modal onClose={() => setShowSurpriseMeModal(false)}>
          <div className='profileDropdownModalContainer'>
            <div>
              <div className='profileDropdownModalHeader'>Congratulations</div>
              <div className='profileDropdownModalBody'>We've added {randomShare} share{(randomShare > 1?'s':'')} of {randomTicker} to your account, enjoy.</div>
            </div>
            <button className='profileDropdownModalCloseButton' onClick={() => {setShowSurpriseMeModal(false)}}>Got it</button>
          </div>
        </Modal>
      )}
      {showTooRichModal && (
        <Modal onClose={() => setShowTooRichModal(false)}>
          <div className='profileDropdownModalContainer'>
            <div>
              <div className='profileDropdownModalHeader'>We Thank You</div>
              <div className='profileDropdownModalBody'>Thank you for your generosity, whoever receives your money will be forever grateful.</div>
            </div>
            <button className='profileDropdownModalCloseButton' onClick={() => {setShowTooRichModal(false)}}>Got it</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ProfileButton;