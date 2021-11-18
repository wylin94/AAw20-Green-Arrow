import React, { useState } from 'react';
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { createPortfolio } from '../../store/portfolio';
import { buyingPower } from '../../store/session';

const BuyForm = () => {
	const dispatch = useDispatch();
	const user = useSelector(state => state.session.user);
	const user_id = user.id;

	const stock = useSelector(state => state.stockDetail);
	const purchase_price = (stock?.iexAskPrice !== 0) ? stock?.iexAskPrice:stock?.iexClose

	const { ticker } = useParams();
	const [shares, setShares] = useState('');

	const current_buying_power = user?.buying_power
	const new_buying_power = current_buying_power - (purchase_price * shares)

	const handleBuySubmit = async (e) => {
		e.preventDefault();
		let newPortfolio = await dispatch(createPortfolio({user_id, ticker, share:shares , purchase_price}));
		if (newPortfolio) {
			console.log(1)
			await dispatch(buyingPower({user_id, new_buying_power}));
			setShares('');
		}
	}

	return(
		<>
			<form onSubmit={handleBuySubmit}>
				<div>
					<div>Invest In</div>
					<div>Shares</div>
				</div>
				<label>Shares</label>
				<input
					type='number'
					required
					value={shares}
					onChange={e => setShares(parseInt(e.target.value))}
					placeholder='0' />
				<div>
					<div>Market Price</div>
					<div>${purchase_price?.toFixed(2)}</div>
				</div>
				<div>
					<div>Estimated Cost</div>
					<div>${(purchase_price * shares)?.toFixed(2)}</div>
				</div>
				<button type='submit'>Buy</button>
			</form>
		</>
	)
}

export default BuyForm;