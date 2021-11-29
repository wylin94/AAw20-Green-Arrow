import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import { NavLink, useHistory } from "react-router-dom";

import { getAllStock } from '../../store/stock';
import { getOneStock } from '../../store/stockDetail';
import { getPortfolios } from '../../store/portfolio';
import { getWatchlists, createWatchlist, removeWatchlist } from '../../store/watchlist';
import { getOneDayGraph, getRangeGraph } from '../../store/stockGraph';
import BuyForm from './BuyForm';
import SellForm from './SellForm';
import Graph from '../Graph';
import './StockDetail.css';
import { GiConsoleController } from 'react-icons/gi';


function StockDetail() {
	const dispatch = useDispatch();
	const history = useHistory();
	const { ticker } = useParams();
	const stocks = useSelector(state => Object.values(state.stock));
	const user_id = useSelector(state => state.session.user).id;
	const stock = useSelector(state => state.stockDetail);
	const watchlist = useSelector(state => state.watchlist.watchlists?.filter(ele => ele.user_id === user_id))?.find(ele => ele.ticker === ticker);
	const onWatchlist = watchlist ? true : false;
	const stockGraph = useSelector(state => Object.values(state.stockGraph));

	const [buyForm, setBuyForm] = useState(true);
	const [sellForm, setSellForm] = useState(false);
	const [watchCheck, setWatchCheck] = useState(onWatchlist);
	const [oneDButton, setOneDButton] = useState(true);
	const [oneWButton, setOneWButton] = useState(false);
	const [oneMButton, setOneMButton] = useState(false);
	const [threeMButton, setThreeMButton] = useState(false);
	const [oneYButton, setOneYButton] = useState(false);
	const [threeYButton, setThreeYButton] = useState(false);
	const [news, setNews] = useState([]);
	const [companyInfo, setCompanyInfo] = useState([]);
	console.log('*****', companyInfo);

	const handleGraphRange = (ticker, oneD, oneW, oneM, threeM, oneY, threeY) => {
		setOneDButton(oneD);
		setOneWButton(oneW);
		setOneMButton(oneM);
		setThreeMButton(threeM);
		setOneYButton(oneY);
		setThreeYButton(threeY);
		if (oneD) {dispatch(getOneDayGraph(ticker, '20211124'))}
			else if (oneW) {dispatch(getRangeGraph(ticker, '5d'))}
			else if (oneM) {dispatch(getRangeGraph(ticker, '1m'))}
			else if (threeM) {dispatch(getRangeGraph(ticker, '3m'))}
			else if (oneY) {dispatch(getRangeGraph(ticker, '1y'))}
			else if (threeY) {dispatch(getRangeGraph(ticker, '3y'))};
	};

	const handleShowBuySellForm = (showBuy, showSell) => {
		setBuyForm(showBuy);
		setSellForm(showSell);
	};

	const handleShuffleToWatchlist = () => {
		if (!watchlist) {
			dispatch(createWatchlist({user_id, ticker}));
			setWatchCheck(true);
		} else {
			dispatch(removeWatchlist(watchlist.id));
			setWatchCheck(false);
		};
	};

	useEffect(() => {
		dispatch(getPortfolios());
		dispatch(getWatchlists());
		dispatch(getAllStock());
		dispatch(getOneStock(ticker.toLowerCase())).then(
			res => {if (!res) {history.push("/pageNotFound")}}
		);
		dispatch(getOneDayGraph(ticker, '20211124')); //hardcoded date, need to updated
	}, [dispatch, ticker]);
	// console.log(new Date().toISOString().slice(0, 10))

	useEffect(() => {
		const getNews = async () => {
			const response = await fetch(`https://cloud.iexapis.com/stable/time-series/news/${ticker}?range=last-week&limit=15&token=pk_b594792b9ef34e0e96c77e7d19984f80`);
			// const response = await fetch(`https://sandbox.iexapis.com/stable/time-series/news/${ticker}?range=last-week&limit=15&token=Tpk_c924ab8d178f4d0681afac7b5eb34c34`);
			if (response.ok) {
				const news = await response.json();
				setNews(news);
			};
		};
		getNews();
	}, []);

	useEffect(() => {
		const getCompanyInfo = async () => {
			const response = await fetch(`https://cloud.iexapis.com/stable/stock/${ticker}/company?token=pk_b594792b9ef34e0e96c77e7d19984f80`);
			// const response = await fetch(`https://sandbox.iexapis.com/stable/time-series/news/${ticker}?range=last-week&limit=15&token=Tpk_c924ab8d178f4d0681afac7b5eb34c34`);
			if (response.ok) {
				const companyInfo = await response.json();
				setCompanyInfo(companyInfo);
			};
		};
		getCompanyInfo();
	}, [])

	return(
		<div className='sdWrapper'>
			<div className='sdContainer'>

				<div className='sdStockFeed'>
					<div className='sdGraphSection'>
						<div className='sdGraphBalanceContainer'>
							<div className='sdGraphCompanyName'>{stock?.companyName}</div>
							<div className='sdGraphStockPrice'>
								${((stock?.iexAskPrice !== 0) ? 
								stock?.iexAskPrice : 
								stock?.iexClose)?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
							<div className='sdGraphBalanceChangeContainer'>
								<div className='sdGraphBalanceChangeAmount'>
									{stock.change?.toString()[0] === '-' && '-'}
									${(stock.change?.toString()[0] === '-') ? 
									stock.change?.toFixed(2).slice(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 
									stock.change?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}  
									{' '}
									({(stock.changePercent) ? (stock.changePercent * 100).toFixed(2) : 0}%)</div>
								<div className='sdGraphBalanceChangeToday'>Today</div>
							</div>
						</div>
						<div className='sdGraphStockGraph'>
							<div className='sdGraphSockGraphContainer'>
								<Graph stockGraph={stockGraph}/>
							</div>
							<div className='sdGraphStockGraphButtonContainer'>
								<button 
									className='sdGraphStockGraphButton' 
									id={oneDButton?'graphButtonHighlight':''} 
									onClick={() => handleGraphRange(ticker, true, false, false, false, false, false)}> 
									1D</button>
								<button 
									className='sdGraphStockGraphButton' 
									id={oneWButton?'graphButtonHighlight':''} 
									onClick={() => handleGraphRange(ticker, false, true, false, false, false, false)}> 
									1W</button>
								<button className='sdGraphStockGraphButton' 
									id={oneMButton?'graphButtonHighlight':''} 
									onClick={() => handleGraphRange(ticker, false, false, true, false, false, false)}> 
									1M</button>
								<button className='sdGraphStockGraphButton' 
									id={threeMButton?'graphButtonHighlight':''} 
									onClick={() => handleGraphRange(ticker, false, false, false, true, false, false)}> 
									3M</button>
								<button 
									className='sdGraphStockGraphButton' 
									id={oneYButton?'graphButtonHighlight':''} 
									onClick={() => handleGraphRange(ticker, false, false, false, false, true, false)}> 
									1Y</button>
								<button 
									className='sdGraphStockGraphButton' 
									id={threeYButton?'graphButtonHighlight':''} 
									onClick={() => handleGraphRange(ticker, false, false, false, false, false, true)}> 
									5Y</button>
							</div>
						</div>
						{/* <div className='sdGraphShareOwnedStatContainer'>
							<div className='sdGraphMarketValueContainer'>
								<div>Your market value</div>
								<div>amount</div>
								<div>
									<div>Today's return</div>
									<div>amount</div>
								</div>
								<div>
									<div>Total return</div>
									<div>amount</div>
								</div>
							</div>
							<div className='sdGraphAverageContainer'>
								<div>Your average cost</div>
								<div>amount</div>
								<div>
									<div>shares</div>
									<div>amount</div>
								</div>
							</div>
						</div> */}
					</div>
					
					<div className='sdCompanyInfoSection'>
						<div className='sdCompanyInfoHeader'>About</div>
						<div className='sdCompanyInfoDes'>{companyInfo.description}</div>
						<div className='sdCompanyInfoBody'>
							<div className='sdCompanyItem'>
								<div className='sdCompanyInfoItemHead'>CEO</div>
								<div className='sdCompanyInfoItemData'>{companyInfo.CEO}</div>
							</div>
							<div className='sdCompanyItem'>
								<div className='sdCompanyInfoItemHead'>Employees</div>
								<div className='sdCompanyInfoItemData'>{companyInfo.employees?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
							</div>
							<div className='sdCompanyItem'>
								<div className='sdCompanyInfoItemHead'>Headquarters</div>
								<div className='sdCompanyInfoItemData'>{companyInfo.city}, {companyInfo.country}</div>
							</div>
						</div>
					</div>


					<div className='pfNewsSection'>
						<div className='pfNewsHeader'>News</div>
						<div className='pfNewsBody'>
							{news.map(article => {
								return (
									<a className='pfNewsArticleLink' key={article.subkey} href={article.qmUrl}>
										<div className='pfNewsArticleContainer'>
											<div className='pfNewsArticleText'>
												<div className='pfNewsArticleProvider'>{article.provider}</div>
												<div className='pfNewsArticleHeadline'>{article.headline}</div>
												<div className='pfNewsArticleRelated'>{article.related}</div>
											</div>
											<div 
												className='pfNewsArticleImageContainer'
												style={{  backgroundImage: `url(  ${article.imageUrl}  )`  }}>
											</div>
											{/* {article.imageUrl && <img className='pfNewsArticleImage' src={article.imageUrl} alt={`${article.related} news`}></img>} */}
										</div>
									</a>
								)
							})}
						</div>
					</div>
				</div>

				<div className='sdSidePanel'>
					<div className='sdBuySellFormContainer'>
						<div className='sdSidePanelBuySellButtonContainer'>
							<button 
								className='sdSidePanelBuy' 
								id={buyForm ? 'sdSidePanelBuyHighlight' : ''} 
								onClick={() => handleShowBuySellForm(true, false)}>
								Buy {stock.symbol}</button>
							<button 
								className='sdSidePanelSell' 
								id={!buyForm ? 'sdSidePanelSellHighlight' : ''} 
								onClick={() => handleShowBuySellForm(false, true)}>
								Sell {stock.symbol}</button>
						</div>
						<div className='sdOrder'>
							{buyForm && <BuyForm />}
							{sellForm && <SellForm />}
						</div>
					</div>
					<div className='sdAddToWatchContainer'>
						<button className='sdAddToWatchButton' 
							onClick={handleShuffleToWatchlist}>
							{watchCheck ? (<div><AiOutlineCheck /></div>) : (<div><AiOutlinePlus /></div>)} Add to Watchlist</button>
					</div>
				</div>

			</div>
		</div>
	)
}

export default StockDetail;