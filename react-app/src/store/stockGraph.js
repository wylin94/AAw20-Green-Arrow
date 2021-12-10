//////////// TYPE ////////////
const LOAD = 'graph/LOAD'

/////////// ACTION /////////////
const loadGraph = graph => ({
	type: LOAD,
	graph
})

/////////// THUNK /////////////
export const getOneDayGraph = (ticker, date) => async (dispatch) => {
	const response = await fetch(`https://cloud.iexapis.com/stable/stock/${ticker}/chart/date/${date}?token=pk_b594792b9ef34e0e96c77e7d19984f80`);
	// const response = await fetch(`https://sandbox.iexapis.com/stable/stock/${ticker}/chart/date/${date}?token=Tpk_c924ab8d178f4d0681afac7b5eb34c34`);
	if (response.ok) {
		const graph = await response.json();
		dispatch(loadGraph(graph));
	}
};


export const getRangeGraph = (ticker, range) => async (dispatch) => {
	const response = await fetch(`https://cloud.iexapis.com/stable/stock/${ticker}/chart/${range}?token=pk_b594792b9ef34e0e96c77e7d19984f80`);
	// const response = await fetch(`https://sandbox.iexapis.com/stable/stock/${ticker}/chart/${range}?token=Tpk_c924ab8d178f4d0681afac7b5eb34c34`);
	if (response.ok) {
		const graph = await response.json();
		dispatch(loadGraph(graph));
	}
};

/////////// REDUCER /////////////
const stockGraphReducer = (state = {}, action) => {
	switch (action.type) {
		case LOAD:
			return {...action.graph };
		default:
			return state;
	}
}

export default stockGraphReducer;