//////////// TYPE ////////////
const LOAD = 'stockDetail/LOAD'


/////////// ACTION /////////////

const loadStockDetail = stock => ({
	type: LOAD,
	stock
})

/////////// THUNK /////////////
export const getOneStock = (ticker) => async (dispatch) => {
	const response = await fetch(`https://sandbox.iexapis.com/stable/stock/${ticker}/quote?token=Tpk_c924ab8d178f4d0681afac7b5eb34c34`);
	if (response.ok) {
		const stock = await response.json();
		dispatch(loadStockDetail(stock));
		return stock;
	}
};

/////////// REDUCER /////////////
const stockDetailReducer = (state = {}, action) => {
	switch (action.type) {
		case LOAD:
			return {...state, ...action.stock};
		default:
			return state;
	}
}

export default stockDetailReducer;