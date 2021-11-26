import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { getAllStock } from '../../store/stock';
import { getPortfolios } from '../../store/portfolio';
import { getWatchlists } from '../../store/watchlist';
import { getOneStock } from '../../store/stockDetail';
import { getStockDetailAll } from '../../store/stockDetailAll';
import { getWatchlistDetailAll } from '../../store/watchlistDetailAll';
import { getStockGraphAll } from '../../store/stockGraphAll';
import { getWatchlistGraphAll } from '../../store/watchlistGraphAll';
import Graph from '../Graph';
import './Portfolio.css';

function Portfolio() {
	const dispatch = useDispatch();
	const user = useSelector(state => state.session.user);
	const stocks = useSelector(state => Object.values(state.stock));
	// const portfolios = useSelector(state => state.portfolio.portfolios?.filter(ele => ele.user_id === user.id));
	// const watchlists = useSelector(state => state.watchlist.watchlists?.filter(ele => ele.user_id === user.id));

	const stockDetailAll = useSelector(state => Object.values(state.stockDetailAll));
	const stockDetailAllObject = useSelector(state => state.stockDetailAll);

	const watchlistDetailAll = useSelector(state => Object.values(state.watchlistDetailAll));
	const watchlistDetailAllObject = useSelector(state => state.watchlistDetailAll);

	const stockListGraph = useSelector(state => state.stockGraphAll);
	const watchlistGraph = useSelector(state => state.watchlistGraphAll);

	const [portfolios, setPortfolios] = useState([]);
	const [watchlists, setWatchlists] = useState([]);

	// const [stockGraph, setStockGraph] = useState();
	
	// TOTAL PROFOLIO BALANCE //
	const findStockPrice = ticker => {
		const stock = stocks?.find(stock => stock.symbol === ticker);
		return (stock?.askPrice !== 0) ? stock?.askPrice : stock?.lastSalePrice;
	}
	const portfoliosRunningBalance = portfolios?.reduce((a, b) => a + (findStockPrice(b.ticker) * b.share), 0);
	

	// TO COMBINE MULTIPLE LINE OF PORFOLIOS WITH SAME TICKER //
	const combinedPortfolios = () => {
		let result = [];
		for (let i = 0; i < portfolios?.length; i++) {
			if (result.length === 0) {
				result.push({...portfolios[i]});
				continue;
			};
			if (result.find(ele => ele.ticker === portfolios[i].ticker)) {
				result.forEach(ele => {
					if (ele.ticker === portfolios[i].ticker) {
						ele.share = ele.share + portfolios[i].share;
					};
				});
			} else {
				result.push({...portfolios[i]});
			}
		};
		return result;
	};
	const combinedPortfoliosResult = combinedPortfolios();

	// COMBINED TOTAL CHANGE OF PORTFOLIO //
	let arrayOfPortfolioTicker = [];
	combinedPortfoliosResult?.forEach(portfolio => arrayOfPortfolioTicker.push(portfolio.ticker));
	const totalCombinedChange = () => {
		let result = 0;
		combinedPortfoliosResult.forEach(portfolio => {
			result = result + (portfolio.share * stockDetailAllObject[portfolio.ticker]?.change);
		})
		return result;
	};

	let arrayOfWatchlistTicker = [];
	watchlists?.forEach(watchlist => arrayOfWatchlistTicker.push(watchlist.ticker));

	// useEffect(() => {
	// 	combinedPortfoliosResult?.forEach(async portfolio => {
	// 		const response = await fetch(`https://sandbox.iexapis.com/stable/stock/${portfolio.ticker}/chart/1m?token=Tpk_c924ab8d178f4d0681afac7b5eb34c34`);
	// 		if (response.ok) {
	// 			const graph = await response.json();
	// 			let newState = {...stockGraph};
	// 			newState[portfolio.ticker] = graph;
	// 			setStockGraph(newState);
	// 		}
	// 	})
	// }, [combinedPortfoliosResult]);

	useEffect(() => {
		dispatch(getPortfolios()).then(res => {
			const result = res.portfolios.filter(ele => ele.user_id === user.id);
			setPortfolios(result);
		});
		dispatch(getWatchlists()).then(res => {
			const result = res.watchlists.filter(ele => ele.user_id === user.id);
			setWatchlists(result);
		});
		dispatch(getAllStock());
	}, [dispatch]);

	useEffect(() => {
		if(arrayOfPortfolioTicker.length > 0 && stockDetailAll.length < arrayOfPortfolioTicker.length) {
			dispatch(getStockDetailAll(arrayOfPortfolioTicker));
			dispatch(getStockGraphAll(arrayOfPortfolioTicker));
		};
	}, [dispatch, portfolios]);

	useEffect(() => {
		if(arrayOfWatchlistTicker.length > 0 && watchlistDetailAll.length <arrayOfWatchlistTicker.length) {
			dispatch(getWatchlistDetailAll(arrayOfWatchlistTicker));
			dispatch(getWatchlistGraphAll(arrayOfWatchlistTicker));
		};
	}, [dispatch, watchlists]);

	
	return(
		<div className='pfWrapper'>
			<div className='pfContainer'>

				<div className='pfStockFeed'>
					<div className='pfGraphSection'>
						<div className='pfGraphBalanceContainer'>

							<div className='pfGraphBalanceTotal'>
								${(portfoliosRunningBalance) ? 
								(user.buying_power + portfoliosRunningBalance).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}</div>
							<div className='pfGraphBalanceChangeContainer'>
								<div className='pfGraphBalanceChangeAmount'>
									{totalCombinedChange()?.toString()[0] === '-' && '-'}
									${(totalCombinedChange()?.toString()[0] === '-') ? 
									totalCombinedChange()?.toFixed(2).slice(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 
									totalCombinedChange()?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 
									{' '} 
									({((totalCombinedChange() / ( totalCombinedChange() + user.buying_power + portfoliosRunningBalance)) * 100).toFixed(2)}%)</div>
								<div className='pfGraphBalanceChangeToday'>Today</div>
							</div>

						</div>
						<div className='pfGraphStockGraphContainer'>
							{/* <Graph /> */}
						</div>

						<div className='pfGraphBuyingPowerContainer'>
							<div className='pfGraphBuyingPowerText'>Buying Power</div>
							<div className='pfGraphBuyingPowerAmount'>
								${user.buying_power?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
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
						{combinedPortfoliosResult?.map(portfolio => {
							return (
								<NavLink className='pfStockListItemNav' key={portfolio.id} to={`/stocks/${portfolio.ticker}`}>
									<div className='pfStockListItem'>
										<div className='pfStockListItemLeft'>
											<div className='pfStockListItemTickerContainer'>
												<div className='pfStockListItemTicker'>{portfolio.ticker}</div>
												<div className='pfStockListItemShares'>{portfolio.share.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} share{portfolio.share > 1 && 's'}</div>
											</div>
											<div className='pfStockListItemGraph'>
												{stockListGraph[portfolio.ticker?.toUpperCase()] && <Graph stockGraph={Object.values(stockListGraph[portfolio.ticker?.toUpperCase()])}/>}
											</div>
										</div>
										<div className='pfStockListItemPriceContainer'>
											<div className='pfStockListItemPrice'>
												${((stocks.find(stock => stock.symbol === portfolio.ticker)?.askPrice !== 0) ?
													stocks.find(stock => stock.symbol === portfolio.ticker)?.askPrice : 
													stocks.find(stock => stock.symbol === portfolio.ticker)?.lastSalePrice)?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
											<div 
												className='pfStockListItemPercent' 
												id={(stockDetailAllObject[portfolio.ticker]?.changePercent < 0) ? 'pfStockListItemPercentNegative' : 'pfStockListItemPercentPositive'}>
												{(stockDetailAllObject[portfolio.ticker]?.changePercent * 100).toFixed(2)}%</div>
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
								<NavLink className='pfWatchlistItemNav' key={watchlist.id}to={`/stocks/${watchlist.ticker}`}>
									<div className='pfWatchlistItem'>
										<div className='pfWatchlistItemLeft'>
											<div className='pfWatchlistItemTickerContainer'>
												<div className='pfWatchlistItemTicker'>{watchlist.ticker}</div>
											</div>
											<div className='pfWatchlistItemGraph'>
												{watchlistGraph[watchlist.ticker?.toUpperCase()] && <Graph stockGraph={Object.values(watchlistGraph[watchlist.ticker?.toUpperCase()])}/>}
											</div>
										</div>
										<div className='pfWatchlistItemPriceContainer'>
											<div className='pfWatchlistItemPrice'>
												${((stocks.find(stock => stock.symbol === watchlist.ticker)?.askPrice !== 0) ?
													stocks.find(stock => stock.symbol === watchlist.ticker)?.askPrice : 
													stocks.find(stock => stock.symbol === watchlist.ticker)?.lastSalePrice)?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
											<div 
												className='pfWatchlistItemPercent' 
												id={(watchlistDetailAllObject[watchlist.ticker]?.changePercent < 0) ? 'pfWatchlistItemPercentNegative':'pfWatchlistItemPercentPositive'}>
												{(watchlistDetailAllObject[watchlist.ticker]?.changePercent * 100).toFixed(2)}%</div>
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