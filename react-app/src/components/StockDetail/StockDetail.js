import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import { NavLink, useHistory } from "react-router-dom";

import { getAllStock } from '../../store/stock';
import { getOneStock } from '../../store/stockDetail';
import { getPortfolios } from '../../store/portfolio';
import { getWatchlists, createWatchlist, removeWatchlist } from '../../store/watchlist';
import { getOneMonthGraph } from '../../store/stockGraph';
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
	const [check, setCheck] = useState(onWatchlist);

	useEffect(() => {
		dispatch(getPortfolios());
		dispatch(getWatchlists());
		dispatch(getAllStock());
		dispatch(getOneStock(ticker.toLowerCase()));
		dispatch(getOneMonthGraph());
	}, [dispatch, ticker]);

	useEffect(() => {
		if (stocks.length > 0) {
			if (!stocks.find(ele => ticker === ele.symbol)) {
				history.push("/pageNotFound")
			}
		}
	}, [dispatch, ticker, stocks]);


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
			setCheck(true);
			// if (watchlist) {console.log('do something')};
		} else {
			const watchlistToDelete = await dispatch(removeWatchlist(watchlist.id));
			setCheck(false);
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
						<button className='sdAddToWatchButton' onClick={handleShuffleToWatchlist}>{check?(<div><AiOutlineCheck /></div>):(<div><AiOutlinePlus /></div>)} Add to Watchlist</button>
					</div>

				</div>	
			</div>
		</div>

	)
}

export default StockDetail;