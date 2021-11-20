import React, { useState } from 'react';
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { createPortfolio } from '../../store/portfolio';
import { buyingPower } from '../../store/session';
import './BuyForm.css';

const BuyForm = () => {
	const dispatch = useDispatch();
	const user = useSelector(state => state.session.user);
	const user_id = user.id;

	const stock = useSelector(state => state.stockDetail);
	const purchase_price = (stock?.iexAskPrice !== 0) ? stock?.iexAskPrice:stock?.iexClose

	const { ticker } = useParams();
	const [shares, setShares] = useState('');
	const [disableBuy, setDisableBuy] = useState(false)

	const current_buying_power = user?.buying_power
	const new_buying_power = current_buying_power - (purchase_price * shares)

	const handleBuySubmit = async (e) => {
		e.preventDefault();
		const newPortfolio = await dispatch(createPortfolio({user_id, ticker, share:shares , purchase_price}));
		if (newPortfolio) {
			await dispatch(buyingPower({user_id, new_buying_power}));
			setShares('');
		}
	}

	if(disableBuy === false) {
		if(purchase_price * shares > current_buying_power) {
			setDisableBuy(true);
		}
	} else if (disableBuy === true) {
		if (purchase_price * shares <= current_buying_power)
			setDisableBuy(false)
	}

	return(
		<div className='bfWrapper'>
			<form className='bfForm' onSubmit={handleBuySubmit}>
				<div className='bfHeader'>Buy {stock.symbol}</div>
				<div className='bfInvestIn'>
					<div>Invest In</div>
					<div>Shares</div>
				</div>
				<div className='bfShares'>
					<label>Shares</label>
					<input
						type='number'
						min="1"
						required
						value={shares}
						onChange={e => setShares(parseInt(e.target.value))}
						placeholder='0' />
				</div>
				<div className='bfMarketPrice'>
					<div>Market Price</div>
					<div>${purchase_price?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
					{/* <div>${Number(parseFloat(purchase_price)?.toFixed(2)).toLocaleString('en')}</div> */}
				</div>
				<div className='bfEstimatedCost'>
					<div>Estimated Cost</div>
					<div>${!shares ? 0:(purchase_price * shares)?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
				</div>
				{disableBuy && <div>Not Enough Buying Power</div>}
				<button disabled={disableBuy} type='submit'>Buy</button>
				<div>${user.buying_power?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} buying power available</div>
			</form>
		</div>
	)
}

export default BuyForm;