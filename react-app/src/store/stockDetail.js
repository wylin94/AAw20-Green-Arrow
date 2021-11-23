//////////// TYPE ////////////
const LOAD = 'stockDetail/LOAD'
// const LOADCHANGE = 'stockChange/LOADCHANGE'

/////////// ACTION /////////////

const loadStockDetail = stock => ({
	type: LOAD,
	stock
})

// const loadStockChange = stock => ({
// 	type: LOADCHANGE,
// 	stock
// })

/////////// THUNK /////////////

export const getOneStock = (ticker) => async (dispatch) => {
	const response = await fetch(`https://sandbox.iexapis.com/stable/stock/${ticker}/quote?token=Tpk_c924ab8d178f4d0681afac7b5eb34c34`);
	if (response.ok) {
		const stock = await response.json();
		dispatch(loadStockDetail(stock));
		return stock;
	}
};

// export const getStockChange = (ticker) => async (dispatch) => {
// 	const response = await fetch(`https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=pk_b594792b9ef34e0e96c77e7d19984f80`);
// 	if (response.ok) {
// 		const stock = await response.json();
// 		console.log('*********', stock)
// 		return stock;
// 	}
// };

const stockDetailReducer = (state = {}, action) => {
	switch (action.type) {
		case LOAD:
			return {...state, ...action.stock};
		default:
			return state;
	}
}

export default stockDetailReducer;