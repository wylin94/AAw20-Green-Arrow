import React, { useState } from 'react';
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { createPortfolio } from '../../store/portfolio';
import { buyingPower } from '../../store/session';
import { removePortfolio } from '../../store/portfolio';
import { editPortfolio } from '../../store/portfolio';
import './SellForm.css';

const SellForm = () => {
	const dispatch = useDispatch();
	const user = useSelector(state => state.session.user);
	const user_id = user.id;
	const stock = useSelector(state => state.stockDetail);
	const sell_price = (stock?.iexBidPrice !== 0) ? stock?.iexBidPrice:stock?.iexClose;
	const portfolios = useSelector(state => state.portfolio.portfolios?.filter(ele => ele.user_id === user.id));
	const { ticker } = useParams();
	const [shares, setShares] = useState('');
	const shareAvailable = portfolios?.filter(ele => ele.ticker === ticker).reduce((a, b) => a + b.share, 0); 
	const current_buying_power = user?.buying_power;
	const new_buying_power = current_buying_power + (sell_price * shares);
	const [disableSell, setDisableSell] = useState(false)

  let sharesToSell = shares;
	const handleSellSubmit = async (e) => {
		e.preventDefault();
		for (let i = 0; i < portfolios.length; i++) {
			const portfolio_id = portfolios[i].id
			if (sharesToSell !== 0) {
				if (portfolios[i].ticker === ticker && portfolios[i].share <= sharesToSell) {
					await dispatch(removePortfolio(portfolios[i].id))
					sharesToSell = sharesToSell - portfolios[i].share
					// i = 0
				} else if (portfolios[i].ticker === ticker && portfolios[i].share > sharesToSell) {
					const share = portfolios[i].share - sharesToSell
					const last = await dispatch(editPortfolio({portfolio_id, share}))
					if (last) {
						await dispatch(buyingPower({user_id, new_buying_power}));
					}
					// setShares('');
					break
				}
			}
			setShares('');
		}
	}

	if(disableSell === false) {
		if(shareAvailable < shares) {
			setDisableSell(true);
		}
	} else if (disableSell === true) {
		if (shareAvailable >= shares)
			setDisableSell(false)
	}
	
	return(
		<div className='sfWrapper'>
			<form className='sfForm' onSubmit={handleSellSubmit}>
				<div className='sfHeader'>Sell {stock.symbol}</div>
				<div className='sfInvestIn'>
					<div>Invest In</div>
					<div>Shares</div>
				</div>
				<div className='sfShares'>
					<label>Shares</label>
					<input
						type='number'
						min="1"
						required
						value={shares}
						onChange={e => setShares(parseInt(e.target.value))}
						placeholder='0' />
				</div>
				<div className='sfMarketPrice'>
					<div>Market Price</div>
					<div>${sell_price?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
				</div>
				<div className='sfEstimatedCredit'>
					<div>Estimated Credit</div>
					<div>${(sell_price * shares)?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
				</div>
				{disableSell && <div>Not Enough Shares</div>}
				<button disabled={disableSell} type='submit'>Sell</button>
				<div>{shareAvailable?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Share{shareAvailable > 1 && 's'} Available</div>
			</form>
		</div>
	)
}

export default SellForm;