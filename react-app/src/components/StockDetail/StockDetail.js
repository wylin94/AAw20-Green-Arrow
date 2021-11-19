import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { getAllStock } from '../../store/stock';
import { getOneStock } from '../../store/stockDetail';
import { getPortfolios } from '../../store/portfolio';
import { getWatchlists } from '../../store/watchlist';
import BuyForm from './BuyForm';
import SellForm from './SellForm';
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
	}, [dispatch, ticker]);

	return(
		<div className='sdWrapper'>
			<div className='sdContainer'>




				<div className='sdStockFeed'>

					<div className='sdGraphSection'>
						<div className='sdGraphBalance'>
							<div>{stock?.companyName}</div>
							<div>${((stock?.iexAskPrice !== 0) ? stock?.iexAskPrice:stock?.iexClose)?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
							<div>{stock.change?.toString()[0] === '-' && '-'}
								${(stock.change?.toString()[0] === '-') ? stock.change?.toFixed(2).slice(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","):stock.change?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}  
								{' '}({(stock.changePercent * 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}%) Today</div>
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
						<div>
							<SellForm />
						</div>
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