import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { getAllStock } from '../../store/stock';
import { getPortfolios } from '../../store/portfolio';
import { getWatchlists } from '../../store/watchlist';
import { getOneStock } from '../../store/stockDetail';
import Graph from '../Graph'
import './Portfolio.css'

function Portfolio() {
	const dispatch = useDispatch();
	const user = useSelector(state => state.session.user);

	const stocks = useSelector(state => Object.values(state.stock));
	const findStockPrice = ticker => {
		const stock = stocks?.find(stock => stock.symbol === ticker)
		return (stock?.askPrice !== 0) ? stock?.askPrice:stock?.lastSalePrice;
	}

	const portfolios = useSelector(state => state.portfolio.portfolios?.filter(ele => ele.user_id === user.id));
	// const portfoliosRunningBalance = portfolios?.reduce((a, b) => a + (b.purchase_price * b.share), 0)
	const portfoliosRunningBalance = portfolios?.reduce((a, b) => a + (findStockPrice(b.ticker) * b.share), 0)
	

	const combinedPortfolios = () => {
		let result = []
		for (let i = 0; i < portfolios?.length; i++) {
			if (result.length === 0) {
				result.push({...portfolios[i]})
				continue;
			}
			if (result.find(ele => ele.ticker === portfolios[i].ticker)) {
				result.forEach(ele => {
					if (ele.ticker === portfolios[i].ticker) {
						ele.share = ele.share + portfolios[i].share
					}
				})
			} else {
				result.push({...portfolios[i]})
			}
		}
		return result;
	}
	



	const watchlists = useSelector(state => state.watchlist.watchlists);
	

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
							<div>${(user.buying_power + portfoliosRunningBalance).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")  }</div>
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
							{combinedPortfolios()?.map(portfolio => {
								return (
									<div className='pfStockListItemContainer' key={portfolio.id}>
										<NavLink to={`/stocks/${portfolio.ticker}`}>
											<div className='pfStockListItem'>
												<div>
													<div>{portfolio.ticker}</div>
													<div>{portfolio.share.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} share{portfolio.share > 1 && 's'}</div>
												</div>
												<div>chart</div>
												<div>
													<div>{
														((stocks.find(stock => stock.symbol === portfolio.ticker)?.askPrice !== 0) ?
															stocks.find(stock => stock.symbol === portfolio.ticker)?.askPrice : 
															stocks.find(stock => stock.symbol === portfolio.ticker)?.lastSalePrice)?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
													}</div>
												</div>
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