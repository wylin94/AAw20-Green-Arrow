//////////// TYPE ////////////
const LOAD = 'stockDetailAll/LOAD'

/////////// ACTION /////////////
const loadStockDetailAll = stock => ({
	type: LOAD,
	stock
})

/////////// THUNK /////////////
export const getStockDetailAll = (ticker) => async (dispatch) => {
	const response = await fetch(`https://sandbox.iexapis.com/stable/stock/${ticker}/quote?token=Tpk_c924ab8d178f4d0681afac7b5eb34c34`);
	if (response.ok) {
		const stock = await response.json();
		dispatch(loadStockDetailAll(stock));
		return stock;
	}
};

const stockDetailAllReducer = (state = {}, action) => {
	switch (action.type) {
		case LOAD:
			return {...state, ...action.stock};
		default:
			return state;
	}
}

export default stockDetailAllReducer;