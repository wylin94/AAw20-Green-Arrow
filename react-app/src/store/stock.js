//////////// TYPE ////////////
const LOAD = 'stock/LOAD'

/////////// ACTION /////////////

const loadStock = stocks => ({
  type: LOAD,
	stocks
})

/////////// THUNK /////////////

export const getAllStock = () => async (dispatch) => {
	// const response = await fetch('https://cloud.iexapis.com/stable/tops?token=pk_b594792b9ef34e0e96c77e7d19984f80&symbols=aapl');
	const response = await fetch('https://cloud.iexapis.com/stable/tops?token=pk_b594792b9ef34e0e96c77e7d19984f80');
	// const response = await fetch('https://cloud.iexapis.com/stable/stock/aapl/quote?token=pk_b594792b9ef34e0e96c77e7d19984f80');
	if (response.ok) {
		const stocks = await response.json();
		dispatch(loadStock(stocks));
	}
};


const stockReducer = (state = {}, action) => {
	switch (action.type) {
		case LOAD:
			let newState = {...state, ...action.stocks };
			return newState;
		default:
			return state;
	}
}

export default stockReducer;