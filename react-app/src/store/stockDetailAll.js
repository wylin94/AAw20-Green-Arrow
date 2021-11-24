//////////// TYPE ////////////
const LOAD = 'stockDetailAll/LOAD'

/////////// ACTION /////////////
const loadStockDetailAll = (stock, ticker) => ({
	type: LOAD,
	stock,
	ticker,
})

/////////// THUNK /////////////
export const getStockDetailAll = (arrayOfTicker) => async (dispatch) => {
	for (let i = 0; i < arrayOfTicker.length; i++) {
		const response = await fetch(`https://sandbox.iexapis.com/stable/stock/${arrayOfTicker[i]}/quote?token=Tpk_c924ab8d178f4d0681afac7b5eb34c34`);
		if (response.ok) {
			const stock = await response.json();
			dispatch(loadStockDetailAll(stock, arrayOfTicker[i]));
		}
	}
}


const stockDetailAllReducer = (state = {}, action) => {
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

export default stockDetailAllReducer;