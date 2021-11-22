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

	// USER VARIABLE //
	const user = useSelector(state => state.session.user);

	// STOCK VARIABLE //
	const stocks = useSelector(state => Object.values(state.stock));
	const findStockPrice = ticker => {
		const stock = stocks?.find(stock => stock.symbol === ticker);
		return (stock?.askPrice !== 0) ? stock?.askPrice:stock?.lastSalePrice;
	}

	// PORTFORLIOS VARIABLE //
	const portfolios = useSelector(state => state.portfolio.portfolios?.filter(ele => ele.user_id === user.id));
	const portfoliosRunningBalance = portfolios?.reduce((a, b) => a + (findStockPrice(b.ticker) * b.share), 0);
	const combinedPortfolios = () => {
		let result = [];
		for (let i = 0; i < portfolios?.length; i++) {
			if (result.length === 0) {
				result.push({...portfolios[i]});
				continue;
			}
			if (result.find(ele => ele.ticker === portfolios[i].ticker)) {
				result.forEach(ele => {
					if (ele.ticker === portfolios[i].ticker) {
						ele.share = ele.share + portfolios[i].share;
					}
				})
			} else {
				result.push({...portfolios[i]});
			}
		}
		return result;
	}

	// WATCHLIST VARIABLE //
	const watchlists = useSelector(state => state.watchlist.watchlists?.filter(ele => ele.user_id === user.id));
	

	useEffect(() => {
		dispatch(getPortfolios());
		dispatch(getWatchlists());
		dispatch(getAllStock());
	}, [dispatch]);

	return(
		<div className='pfWrapper'>
			<div className='pfContainer'>

				<div className='pfStockFeed'>

					<div className='pfGraphSection'>
						<div className='pfGraphBalanceContainer'>
							<div className='pfGraphBalanceTotal'>${(portfoliosRunningBalance) ? (user.buying_power + portfoliosRunningBalance).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}</div>
							<div className='pfGraphBalanceChangeContainer'>
								<div className='pfGraphBalanceChangeAmount'>change here</div>
								<div className='pfGraphBalanceChangeToday'>Today</div>
							</div>
						</div>
						<div className='pfGraphStockGraph'>
							<Graph />
						</div>
						<div className='pfGraphBuyingPowerContainer'>
							<div className='pfGraphBuyingPowerText'>Buying Power</div>
							<div className='pfGraphBuyingPowerAmount'>${user.buying_power?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
						</div>
					</div>

					<div className='pfNewsSection'>
					</div>

				</div>

				<div className='pfPortfolioList'>

					<div className='pfStockListHeaderContainer'>
						<div className='pfStockListHeader'>Stocks</div>
					</div>

					<div className='pfStockListBody'>
						{combinedPortfolios()?.map(portfolio => {
							return (
								<NavLink className='pfStockListItemNav' key={portfolio.id} to={`/stocks/${portfolio.ticker}`}>
									<div className='pfStockListItem'>

										<div className='pfStockListItemLeft'>
											<div className='pfStockListItemTickerContainer'>
												<div className='pfStockListItemTicker'>{portfolio.ticker}</div>
												<div className='pfStockListItemShares'>{portfolio.share.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} share{portfolio.share > 1 && 's'}</div>
											</div>
											<div className='pfStockListItemChart'>chart here</div>
										</div>

										<div className='pfStockListItemPriceContainer'>
											<div className='pfStockListItemPrice'>{
												((stocks.find(stock => stock.symbol === portfolio.ticker)?.askPrice !== 0) ?
													stocks.find(stock => stock.symbol === portfolio.ticker)?.askPrice : 
													stocks.find(stock => stock.symbol === portfolio.ticker)?.lastSalePrice)?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
											}</div>
										</div>

									</div>
								</NavLink>
							)
						})}
					</div>

					<div className='pfWatchListHeaderContainer'>
						<div className='pfWatchlistHeader'>Watchlist</div>
					</div>

					<div className='pfWatchlistBody'>
						{watchlists?.map(watchlist => {
							return (
								<NavLink className='pfWatchlistItemNav' to={`/stocks/${watchlist.ticker}`}>
									<div className='pfWatchlistItem'>
										<div className='pfWatchlistItemLeft'>
											<div className='pfWatchlistItemTickerContainer'>
												<div className='pfWatchlistItemTicker'>{watchlist.ticker}</div>
											</div>
											<div className='pfWatchlistItemChart'>chart here</div>
										</div>
										<div className='pfWatchlistItemPriceContainer'>
											<div className='pfWatchlistItemPrice'>{
												((stocks.find(stock => stock.symbol === watchlist.ticker)?.askPrice !== 0) ?
													stocks.find(stock => stock.symbol === watchlist.ticker)?.askPrice : 
													stocks.find(stock => stock.symbol === watchlist.ticker)?.lastSalePrice)?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
											}</div>
										</div>
									</div>
								</NavLink>
							)
						})}
					</div>

				</div>

			</div>
		</div>

	)
}

export default Portfolio;