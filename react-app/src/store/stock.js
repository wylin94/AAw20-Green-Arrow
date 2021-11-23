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
	const response = await fetch('https://sandbox.iexapis.com/stable/tops?token=Tpk_c924ab8d178f4d0681afac7b5eb34c34');
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



// SECRET
// sk_a718c699ee9341758139b8184857000b

// PUBLISHABLE
// pk_b5f1a5344f3a467494a6d5aba22b4a15

// https://cloud.iexapis.com/stable/tops?token=pk_b5f1a5344f3a467494a6d5aba22b4a15