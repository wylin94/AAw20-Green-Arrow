import React, { useState } from 'react';
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { createPortfolio } from '../../store/portfolio';

const BuyForm = () => {
	const dispatch = useDispatch();
	const user_id = useSelector(state => state.session.user.id);
	const stock = useSelector(state => state.stockDetail);
	const purchase_price = (stock?.iexAskPrice !== 0) ? stock?.iexAskprice : stock?.iexClose
  const { ticker } = useParams();
	const [shares, setShares] = useState('');


	const handleBuySubmit = async (e) => {
    e.preventDefault();
    let newPortfolio = await dispatch(createPortfolio({user_id, ticker, share:shares , purchase_price}));
    if (newPortfolio) {
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
					<div>${purchase_price}</div>
				</div>
				<div>
					<div>Estimated Cost</div>
					<div>${(purchase_price * shares).toFixed(2)}</div>
				</div>
				<button type='submit'>Buy</button>
			</form>
		</>
	)
}

export default BuyForm;