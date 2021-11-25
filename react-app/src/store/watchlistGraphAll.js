//////////// TYPE ////////////
const LOAD = 'graphAll/LOAD';

/////////// ACTION /////////////
const loadGraphAll = (graph, ticker) => ({
	type: LOAD,
	graph,
	ticker,
});

/////////// THUNK /////////////
export const getWatchlistGraphAll = (arrayOfWatchlistTicker) => async (dispatch) => {
	for (let i = 0; i < arrayOfWatchlistTicker.length; i++) {
		const response = await fetch(`https://cloud.iexapis.com/stable/stock/${arrayOfWatchlistTicker[i]}/chart/1m?token=pk_b594792b9ef34e0e96c77e7d19984f80`);
		// const response = await fetch(`https://sandbox.iexapis.com/stable/stock/${arrayOfWatchlistTicker[i]}/chart/1m?token=Tpk_c924ab8d178f4d0681afac7b5eb34c34`);
		if (response.ok) {
			const graph = await response.json();
			dispatch(loadGraphAll(graph, arrayOfWatchlistTicker[i]));
		};
	};
};


const watchlistGraphAllReducer = (state = {}, action) => {
	switch (action.type) {
		case LOAD:
			let newState = {...state};
			newState[action.ticker] = {...action.graph};
			return newState;
		default:
			return state;
	};
};

export default watchlistGraphAllReducer;