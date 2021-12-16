import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import ProfileImageUpload from './ProfileImageUpload';
import './Profile.css';

function Profile() {
	const user = useSelector(state => state.session.user);
	const stocks = useSelector(state => Object.values(state.stock));
	const findStockPrice = ticker => {
		const stock = stocks?.find(stock => stock.symbol === ticker);
		return (stock?.askPrice !== 0) ? stock?.askPrice:stock?.lastSalePrice;
	}
	const portfolios = useSelector(state => state.portfolio.portfolios?.filter(ele => ele.user_id === user.id));
	const portfoliosRunningBalance = portfolios?.reduce((a, b) => a + (findStockPrice(b.ticker) * b.share), 0);

	return (
		<div className='profileWrapper'>
			<div className='profileContainer'>
				<div className='profileLeft'>
					<div className='profileHeader'>
						<img className='profileHeaderImage' src={user.profile_image} alt='avator'></img>
						<ProfileImageUpload />
						<div className='profileHeaderNameContainer'>
							<div className='profileHeaderName'>{user.username}</div>
							<div className='profileHeaderNameMoto'>{user.motto}</div>
						</div>
					</div>
					<div className='profileStat'>
						<div className='profileStatItem'>
							<div className='profileStaItemHeader'>Portfolio Value</div>
							<div className='profileStaItemStat'>${(user.buying_power + portfoliosRunningBalance)?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
						</div>
						<div className='profileStatItem'>
							<div className='profileStaItemHeader'>Stock</div>
							<div className='profileStaItemStat'>${(portfoliosRunningBalance)?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
						</div>
						<div className='profileStatItem'>
							<div className='profileStaItemHeader'>Buying Power</div>
							<div className='profileStaItemStat'>${user.buying_power?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
						</div>
					</div>
				</div>
				<div className='profileRight'>
				</div>
			</div>
		</div>
	);
}
export default Profile;