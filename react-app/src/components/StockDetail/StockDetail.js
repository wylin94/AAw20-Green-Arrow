import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { getAllStock } from '../../store/stock';
import { getOneStock } from '../../store/stockDetail';
import { getPortfolios } from '../../store/portfolio';
import { getWatchlists } from '../../store/watchlist';
import BuyForm from './buyForm';
import Graph from '../Graph'
import './StockDetail.css'

function StockDetail() {
	const dispatch = useDispatch();
	const { ticker } = useParams();
	const user = useSelector(state => state.session.user);
	const stock = useSelector(state => state.stockDetail);

	useEffect(() => {
		dispatch(getPortfolios());
		dispatch(getWatchlists());
		dispatch(getAllStock());
		dispatch(getOneStock(ticker.toLowerCase()));
	}, [dispatch]);

	return(
		<div className='sdWrapper'>
			<div className='sdContainer'>




				<div className='sdStockFeed'>

					<div className='sdGraphSection'>
						<div className='sdGraphBalance'>
							<div>{stock?.companyName}</div>
							<div>${((stock?.iexAskPrice !== 0) ? stock?.iexAskPrice:stock?.iexClose)?.toFixed(2)}</div>
							<div>{stock.change} ({stock.changePercent * 100}%) Today</div>
						</div>
						<div className='sdStockGraph'>
							<Graph />
						</div>
					</div>
					
					<div className='sdNewsSection'>
					</div>

				</div>





				<div className='sdSidePanel'>

					<div className='sdOrder'>
            <div>
				<BuyForm />
            </div>
            
						{/* <div>
							<button>buy</button>
							<button>sell</button>
						</div>
						<div>Invest In</div>
						<div>Shares</div>
						<div>Marekt Price</div>
						<div>Estimated Cost</div>
						<button>Review Order</button> */}
						<div>${user.buying_power?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} buying power available</div>
					</div>

					<div className='sdAddToWatch'>
						<button>Add to Lists</button>
					</div>

				</div>







			</div>
		</div>

	)
}

export default StockDetail;