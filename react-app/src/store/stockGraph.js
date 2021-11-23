//////////// TYPE ////////////
const LOAD = 'stockGraph/LOAD'

/////////// ACTION /////////////

const loadStockGraph = stockGraph => ({
    type: LOAD,
	stockGraph
})

/////////// THUNK /////////////

export const getStockGrah = () => async (dispatch) => {
	const response = await fetch('https://sandbox.iexapis.com/stable/tops?token=Tpk_c924ab8d178f4d0681afac7b5eb34c34');
	if (response.ok) {
		const stocks = await response.json();
		dispatch(loadStockGraph(stocks));
	}
};


const stockGraphReducer = (state = {}, action) => {
	switch (action.type) {
		case LOAD:
			let newState = {...state, ...action.stocks };
			return newState;
		default:
			return state;
	}
}

export default stockGraphReducer;