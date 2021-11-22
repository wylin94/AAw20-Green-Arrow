import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { getAllStock } from '../../store/stock';
import { getOneStock } from '../../store/stockDetail';
import { getPortfolios } from '../../store/portfolio';
import { getWatchlists, createWatchlist, removeWatchlist } from '../../store/watchlist';
import BuyForm from './BuyForm';
import SellForm from './SellForm';
import Graph from '../Graph';
import './StockDetail.css';

function StockDetail() {
	const dispatch = useDispatch();
	const { ticker } = useParams();
	const user_id = useSelector(state => state.session.user).id;
	const stock = useSelector(state => state.stockDetail);
	const watchlist = useSelector(state => state.watchlist.watchlists?.filter(ele => ele.user_id === user_id))?.find(ele => ele.ticker === ticker);

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
		if (watchlist) {
			const watchlistToDelete = await dispatch(removeWatchlist(watchlist.id));
			if (watchlistToDelete) {
				console.log('do something')
			}
		}
	}

	return(
		<div className='sdWrapper'>
			<div className='sdContainer'>

				<div className='sdStockFeed'>
					<div className='sdGraphSection'>
						<div className='sdGraphBalanceContainer'>

							<div className='sdGraphCompanyName'>{stock?.companyName}</div>
							<div className='sdGraphStockPrice'>${((stock?.iexAskPrice !== 0) ? stock?.iexAskPrice:stock?.iexClose)?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
							<div className='sdGraphStockChange'>{stock.change?.toString()[0] === '-' && '-'}
								${(stock.change?.toString()[0] === '-') ? stock.change?.toFixed(2).slice(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","):stock.change?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}  
								{' '}({(stock.changePercent) ? (stock.changePercent * 100).toFixed(2) : 0}%) Today
							</div>

						</div>
						<div className='sdStockGraph'>
							<Graph />
						</div>

						<div className='pfGraphShareOwnedStatContainer'>
							<div className='pfGraphMarketValueContainer'>Your market value</div>
							<div className='pfGraphAverageContainer'>Your average cost</div>
						</div>

					</div>
					<div className='sdNewsSection'>
					</div>
				</div>

				<div className='sdSidePanel'>
					<div className='sdSidePanelBuySellButtonContainer'>
						<div>Buy</div>
						<div>Sell</div>
					</div>

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