//////////// TYPE ////////////
const LOAD = 'stockDetail/LOAD'

/////////// ACTION /////////////

const loadStockDetail = stock => ({
  type: LOAD,
	stock
})

/////////// THUNK /////////////

export const getOneStock = (ticker) => async (dispatch) => {
	const response = await fetch(`https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=pk_b594792b9ef34e0e96c77e7d19984f80`);
	if (response.ok) {
		const stock = await response.json();
		// console.log('********STOCK DETAIL')
		// console.log(stock)
		dispatch(loadStockDetail(stock));
	}
};

const stockDetailReducer = (state = {}, action) => {
	switch (action.type) {
		case LOAD:
			let newState = {...state, ...action.stock};
			return newState;
		default:
			return state;
	}
}

export default stockDetailReducer;