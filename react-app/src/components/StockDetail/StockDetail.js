import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { getAllStock } from '../../store/stock';
import { getOneStock } from '../../store/stockDetail';
import { getPortfolios } from '../../store/portfolio';
import { getWatchlists, createWatchlist, removeWatchlist } from '../../store/watchlist';
import BuyForm from './BuyForm';
import SellForm from './SellForm';
import Graph from '../Graph'
import './StockDetail.css'

function StockDetail() {
	const dispatch = useDispatch();
	const { ticker } = useParams();
	const user = useSelector(state => state.session.user);
	const user_id = user.id;
	const stock = useSelector(state => state.stockDetail);
	const watchlist = useSelector(state => state.watchlist.watchlists?.find(ele => ele.ticker === ticker))

	useEffect(() => {
		dispatch(getPortfolios());
		dispatch(getWatchlists());
		dispatch(getAllStock());
		dispatch(getOneStock(ticker.toLowerCase()));
	}, [dispatch, ticker]);

	const handleAddToWatchlist = async (e) => {
		e.preventDefault();
		if (!watchlist) {
			const watchlist = await dispatch(createWatchlist({user_id, ticker}));
			if (watchlist) {
				console.log('do something')
			}
		}
	}

	const handleRemoveFromWatchlist = async (e) => {
		e.preventDefault();
		const watchlistToDelete = await dispatch(removeWatchlist(watchlist.id));
		if (watchlistToDelete) {
			console.log('do something')
		}
	}

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
								{' '}({(stock.changePercent * 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}%) Today
							</div>
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
						<BuyForm />
						<SellForm />
					</div>
					<div className='sdAddToWatch'>
						{/* <button onSubmit={handleAddToWatchlist}>Add to Lists</button> */}
						<form onSubmit={handleAddToWatchlist}>
							<button>Add to List</button>
						</form>
						<form onSubmit={handleRemoveFromWatchlist}>
							<button>Remove from List</button>
						</form>
					</div>
				</div>
			</div>
		</div>

	)
}

export default StockDetail;