//////////// TYPE ////////////
const LOAD = 'stockDetailAll/LOAD';

/////////// ACTION /////////////
const loadStockDetailAll = (stock, ticker) => ({
	type: LOAD,
	stock,
	ticker,
});

/////////// THUNK /////////////
export const getStockDetailAll = (arrayOfPortfolioTicker) => async (dispatch) => {
	for (let i = 0; i < arrayOfPortfolioTicker.length; i++) {
		// const response = await fetch(`https://cloud.iexapis.com/stable/stock/${arrayOfPortfolioTicker[i]}/quote?token=pk_b594792b9ef34e0e96c77e7d19984f80`);
		const response = await fetch(`https://sandbox.iexapis.com/stable/stock/${arrayOfPortfolioTicker[i]}/quote?token=Tpk_c924ab8d178f4d0681afac7b5eb34c34`);
		if (response.ok) {
			const stock = await response.json();
			dispatch(loadStockDetailAll(stock, arrayOfPortfolioTicker[i]));
		};
	};
};

/////////// REDUCER /////////////
const stockDetailAllReducer = (state = {}, action) => {
	switch (action.type) {
		case LOAD: {
			let newState = {...state};
			newState[action.ticker] = action.stock;
			return newState;
		}
		default:
			return state;
	};
};

export default stockDetailAllReducer;