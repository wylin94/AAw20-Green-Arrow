//////////// TYPE ////////////
const LOAD = 'watchlistDetailAll/LOAD'

/////////// ACTION /////////////
const loadWatchlistDetailAll = (stock, ticker) => ({
	type: LOAD,
	stock,
	ticker,
})

/////////// THUNK /////////////
export const getWatchlistDetailAll = (arrayOfWatchlistTicker) => async (dispatch) => {
	for (let i = 0; i < arrayOfWatchlistTicker.length; i++) {
		// const response = await fetch(`https://cloud.iexapis.com/stable/stock/${arrayOfWatchlistTicker[i]}/quote?token=pk_b594792b9ef34e0e96c77e7d19984f80`);
		const response = await fetch(`https://sandbox.iexapis.com/stable/stock/${arrayOfWatchlistTicker[i]}/quote?token=Tpk_c924ab8d178f4d0681afac7b5eb34c34`);
		if (response.ok) {
			const stock = await response.json();
			dispatch(loadWatchlistDetailAll(stock, arrayOfWatchlistTicker[i]));
		}
	}
}

/////////// REDUCER /////////////
const watchlistDetailAllReducer = (state = {}, action) => {
	switch (action.type) {
		case LOAD: {
			let newState = {...state};
			newState[action.ticker] = action.stock;
			return newState;
		}
		default:
			return state;
	}
}

export default watchlistDetailAllReducer;