import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { createPortfolio } from '../../store/portfolio';
import { buyingPower } from '../../store/session';
import { Modal } from '../../context/Modal';
import './BuyForm.css';

const BuyForm = () => {
	const dispatch = useDispatch();

	const { ticker } = useParams();
	const [shares, setShares] = useState('');
	const [disableBuy, setDisableBuy] = useState(false);
	const [showReviewButton, setShowReviewButton] = useState(true);
	const [showBuyConfirm, setShowBuyConfirm] = useState(false);
	const [zeroShareError, setZeroShareError] = useState(false);

	const user = useSelector(state => state.session.user);
	const user_id = user.id;
	const stock = useSelector(state => state.stockDetail);
	const purchase_price = (stock?.iexAskPrice !== 0) ? stock?.iexAskPrice:stock?.iexClose;
	const current_buying_power = user?.buying_power;
	const new_buying_power = current_buying_power - (purchase_price * shares);

	const handleReviewSubmit = async(e) => {
		if (!disableBuy) {
			if (shares) {
				setZeroShareError(false);
				setShowBuyConfirm(true);
				setShowReviewButton(false);
			} else {
				setZeroShareError(true);
			};
		};
	};

	const handleBuyConfirmSubmit = async (e) => {
		e.preventDefault();
		const newPortfolio = await dispatch(createPortfolio({user_id, ticker, share:shares, purchase_price}));
		if (newPortfolio) {
			await dispatch(buyingPower({user_id, new_buying_power}));
			setShares('');
		};
	}

	if(disableBuy === false) {
		if(purchase_price * shares > current_buying_power) {setDisableBuy(true);};
	} else if (disableBuy === true) {
		if (purchase_price * shares <= current_buying_power) {setDisableBuy(false);};
	}

	useEffect(() => {
		setShowReviewButton(true);
		setShowBuyConfirm(false);
		setZeroShareError(false);
	}, [shares])

	return(
		<>
			<form className='bfForm' onSubmit={handleBuyConfirmSubmit}>
				<div className='bfInvestIn'>
					<div className='bfInvestInHeader'>Invest In</div>
					<div className='bfInvestInText'>Shares</div>
				</div>
				<div className='bfShares'>
					<label className='bfSharesHeader'>Shares</label>
					<input
						className='bfSharesInput'
						type='number'
						min="1"
						required
						value={shares}
						onChange={e => setShares(parseInt(e.target.value))}
						placeholder='0' />
				</div>
				<div className='bfMarketPrice'>
					<div className='bfMarketPriceHeader'>Market Price</div>
					<div className='bfMarketPriceText'>${purchase_price?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
					{/* <div>${Number(parseFloat(purchase_price)?.toFixed(2)).toLocaleString('en')}</div> */}
				</div>
				<div className='bfEstimatedCost'>
					<div className='bfEstimatedCostHeader'>Estimated Cost</div>
					<div className='bfEstimatedCostText'>${!shares ? 0 : (purchase_price * shares)?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
				</div>
				<div className='bfErrorContainer'>
					{disableBuy && <div className='bfError'>Not Enough Buying Power</div>}
					{zeroShareError && (<div className='bfError'>Please enter a valid number of shares.</div>)}
					{showBuyConfirm && shares && (<div className='bfBuyConfirmMessage'>Buy {shares.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} share{(shares > 1)?'s':''} of {ticker}</div>)}
				</div>
				{showReviewButton && 
					<div className='bfReviewButton' id={disableBuy ? 'bfBuyDisable' : ''} disabled={disableBuy} onClick={handleReviewSubmit}>Review Order</div>}
				{showBuyConfirm && shares && (
					<button className='bfBuyConfirmButton' id={disableBuy ? 'bfBuyDisable' : ''} disabled={disableBuy} type='submit'>Confirm</button>
				)}
				<div className='bfBuyingPowerAvailableContainer'>
					<div className='bfBuyingPowerAvailable'>${user.buying_power?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} buying power available</div>
				</div>
			</form>
		</>
	)
}

export default BuyForm;