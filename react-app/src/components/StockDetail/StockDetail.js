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
	const [oneDButton, setOneDButton] = useState(false);
	const [oneWButton, setOneWButton] = useState(true);
	const [oneMButton, setOneMButton] = useState(false);
	const [threeMButton, setThreeMButton] = useState(false);
	const [oneYButton, setOneYButton] = useState(false);
	const [threeYButton, setThreeYButton] = useState(false);


	useEffect(() => {
		dispatch(getPortfolios());
		dispatch(getWatchlists());
		dispatch(getAllStock());
		dispatch(getOneStock(ticker.toLowerCase()));
		dispatch(getRangeGraph('5d'));
	}, [dispatch, ticker]);
	// console.log(new Date().toISOString().slice(0, 10))

	useEffect(() => {
		if (stocks.length > 0) {
			if (!stocks.find(ele => ticker === ele.symbol)) {
				history.push("/pageNotFound")
			}
		}
	}, [dispatch, ticker, stocks]);


	const handleGraphRange1d = () => {
		setOneDButton(true);
		setOneWButton(false);
		setOneMButton(false);
		setThreeMButton(false);
		setOneYButton(false);
		setThreeYButton(false);
		dispatch(getOneDayGraph('20211124'));
	}
	const handleGraphRange5d = () => {
		setOneDButton(false);
		setOneWButton(true);
		setOneMButton(false);
		setThreeMButton(false);
		setOneYButton(false);
		setThreeYButton(false);
		dispatch(getRangeGraph('5d'));
	}
	const handleGraphRange1m = () => {
		setOneDButton(false);
		setOneWButton(false);
		setOneMButton(true);
		setThreeMButton(false);
		setOneYButton(false);
		setThreeYButton(false);
		dispatch(getRangeGraph('1m'));
	}
	const handleGraphRange3m = () => {
		setOneDButton(false);
		setOneWButton(false);
		setOneMButton(false);
		setThreeMButton(true);
		setOneYButton(false);
		setThreeYButton(false);
		dispatch(getRangeGraph('3m'));
	}
	const handleGraphRange1y = () => {
		setOneDButton(false);
		setOneWButton(false);
		setOneMButton(false);
		setThreeMButton(false);
		setOneYButton(true);
		setThreeYButton(false);
		dispatch(getRangeGraph('1y'));
	}
	const handleGraphRange5y = () => {
		setOneDButton(false);
		setOneWButton(false);
		setOneMButton(false);
		setThreeMButton(false);
		setOneYButton(false);
		setThreeYButton(true);
		dispatch(getRangeGraph('5y'));
	}

	const handleShowBuyForm = () => {
		setSellForm(false)
		setBuyForm(true)
	}

	const handleShowSellForm =() => {
		setBuyForm(false)
		setSellForm(true)
	}

	const handleShuffleToWatchlist = async (e) => {
		e.preventDefault();
		if (!watchlist) {
			const watchlist = await dispatch(createWatchlist({user_id, ticker}));
			setWatchCheck(true);
			// if (watchlist) {console.log('do something')};
		} else {
			const watchlistToDelete = await dispatch(removeWatchlist(watchlist.id));
			setWatchCheck(false);
			// if (watchlistToDelete) {console.log('do something')};
		}
	}

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
									({(stock.changePercent) ? (stock.changePercent * 100).toFixed(2) : 0}%)
								</div>
								<div className='sdGraphBalanceChangeToday'>Today</div>
							</div>
						</div>

						<div className='sdGraphStockGraph'>
							<Graph stockGraph={stockGraph}/>
							<div className='sdGraphStockGraphButtonContainer'>
								<button className='sdGraphStockGraphButton' id={oneDButton?'graphButtonHighlight':''} onClick={handleGraphRange1d}>1D</button>
								<button className='sdGraphStockGraphButton' id={oneWButton?'graphButtonHighlight':''} onClick={handleGraphRange5d}>1W</button>
								<button className='sdGraphStockGraphButton' id={oneMButton?'graphButtonHighlight':''} onClick={handleGraphRange1m}>1M</button>
								<button className='sdGraphStockGraphButton' id={threeMButton?'graphButtonHighlight':''} onClick={handleGraphRange3m}>3M</button>
								<button className='sdGraphStockGraphButton' id={oneYButton?'graphButtonHighlight':''} onClick={handleGraphRange1y}>1Y</button>
								<button className='sdGraphStockGraphButton' id={threeYButton?'graphButtonHighlight':''} onClick={handleGraphRange5y}>5Y</button>
							</div>
						</div>

						<div className='pfGraphShareOwnedStatContainer'>
							<div className='pfGraphMarketValueContainer'>
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
							<div className='pfGraphAverageContainer'>
								<div>Your average cost</div>
								<div>amount</div>
								<div>
									<div>shares</div>
									<div>amount</div>
								</div>
							</div>
						</div>

					</div>
					<div className='sdNewsSection'>
					</div>
				</div>

				<div className='sdSidePanel'>
					<div className='sdBuySellFormContainer'>
						<div className='sdSidePanelBuySellButtonContainer'>
							<button className='sdSidePanelBuy' id={buyForm?'sdSidePanelBuyHighlight':''} onClick={handleShowBuyForm}>Buy {stock.symbol}</button>
							<button className='sdSidePanelSell' id={!buyForm?'sdSidePanelSellHighlight':''} onClick={handleShowSellForm}>Sell {stock.symbol}</button>
						</div>

						<div className='sdOrder'>
							{buyForm && <BuyForm />}
							{sellForm && <SellForm />}
						</div>
					</div>

					<div className='sdAddToWatchContainer'>
						<button className='sdAddToWatchButton' onClick={handleShuffleToWatchlist}>{watchCheck?(<div><AiOutlineCheck /></div>):(<div><AiOutlinePlus /></div>)} Add to Watchlist</button>
					</div>

				</div>	
			</div>
		</div>

	)
}

export default StockDetail;