import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { getAllStock } from '../../store/stock';
import { getPortfolios } from '../../store/portfolio';
import { getWatchlists } from '../../store/watchlist';
import Graph from '../Graph'
import './Portfolio.css'

function Portfolio() {
	const dispatch = useDispatch();
	const user = useSelector(state => state.session.user);
	const portfolios = useSelector(state => state.portfolio.portfolios?.filter(ele => ele.user_id === user.id));
	const watchlists = useSelector(state => state.watchlist.watchlists);
	const stocks = useSelector(state => Object.values(state.stock));

	useEffect(() => {
		dispatch(getPortfolios());
		dispatch(getWatchlists());
		dispatch(getAllStock());
	}, [dispatch]);

	return(
		<div className='pfWrapper'>
			<div className='pfContainer'>



				<div className='pfStockFeed'>
					<div className='pfgraphSection'>
						<div className='pfgraphBalance'>
							<div>$100,000</div>
							<div>today's change</div>
						</div>
						<div className='pfstockGraph'>
							<Graph />
						</div>
					</div>

					<div className='pfNewsSection'>
					</div>
				</div>



				<div className='pfPortfolioList'>

					<div className='pfStockList'>
						<div className='pfStockListHeader'>Stocks</div>
						<div className='pfStockListBody'>
							{portfolios?.map(portfolio => {
								return (
									<div className='pfStockListItemContainer' key={portfolio.id}>
										<NavLink to={`/stocks/${portfolio.ticker}`}>
											<div className='pfStockListItem'>
												<div>{portfolio.ticker}</div>
												<div>chart</div>
												<div>{
													(stocks.find(stock => stock.symbol === portfolio.ticker)?.askPrice !== 0) ?
														stocks.find(stock => stock.symbol === portfolio.ticker)?.askPrice : 
														stocks.find(stock => stock.symbol === portfolio.ticker)?.lastSalePrice
												}</div>
											</div>
										</NavLink>
									</div>
								)
							})}														
						</div>
					</div>

					<div className='pfWatchlist'>
						<div className='pfWatchlistHeader'>Lists</div>
							<div className='pfWatchlistBody'>
								{watchlists?.map(watchlist => {
									return (
										<div key={watchlist.id}>{watchlist.name}</div>
									)
								})}														
							</div>
					</div>

				</div>



			</div>
		</div>
	)
}

export default Portfolio;