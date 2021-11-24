//////////// TYPE ////////////
const LOAD = 'graph/LOAD'

/////////// ACTION /////////////

const loadGraph = oneMonthGraph => ({
    type: LOAD,
	oneMonthGraph
})

/////////// THUNK /////////////

export const getOneMonthGraph = () => async (dispatch) => {
	const response = await fetch('https://sandbox.iexapis.com/stable/stock/aapl/chart/1m?token=Tpk_c924ab8d178f4d0681afac7b5eb34c34');
	if (response.ok) {
		const oneMonthGraph = await response.json();
		dispatch(loadGraph(oneMonthGraph));
	}
};


const stockGraphReducer = (state = {}, action) => {
	switch (action.type) {
		case LOAD:
			return {...action.oneMonthGraph };
		default:
			return state;
	}
}

export default stockGraphReducer;