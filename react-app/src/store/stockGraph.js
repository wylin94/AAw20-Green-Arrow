//////////// TYPE ////////////
const LOAD = 'graph/LOAD'

/////////// ACTION /////////////

const loadGraph = graph => ({
    type: LOAD,
	graph
})

/////////// THUNK /////////////

export const getOneDayGraph = (date) => async (dispatch) => {
	const response = await fetch(`https://sandbox.iexapis.com/stable/stock/aapl/chart/date/${date}?token=Tpk_c924ab8d178f4d0681afac7b5eb34c34`);
	if (response.ok) {
		const graph = await response.json();
		dispatch(loadGraph(graph));
	}
};


export const getRangeGraph = (range) => async (dispatch) => {
	const response = await fetch(`https://sandbox.iexapis.com/stable/stock/aapl/chart/${range}?token=Tpk_c924ab8d178f4d0681afac7b5eb34c34`);
	if (response.ok) {
		const graph = await response.json();
		dispatch(loadGraph(graph));
	}
};


const stockGraphReducer = (state = {}, action) => {
	switch (action.type) {
		case LOAD:
			return {...action.graph };
		default:
			return state;
	}
}

export default stockGraphReducer;