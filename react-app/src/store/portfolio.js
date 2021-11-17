//////////// TYPE ////////////
const LOAD = 'portfolio/LOAD'

/////////// ACTION /////////////

const loadPortfolios = portfolios => ({
  type: LOAD,
	portfolios
})

/////////// THUNK /////////////

export const getPortfolios = () => async (dispatch) => {
	const response = await fetch(`/api/portfolios`);
	if (response.ok) {
		const portfolios = await response.json();
		dispatch(loadPortfolios(portfolios));
	}
};

////////// REDUCER //////////////

const portfolioReducer = (state = {}, action) => {
	switch (action.type) {
		case LOAD:
			let newState = {...state, ...action.portfolios };
			return newState;
		default:
			return state;
	}
}

export default portfolioReducer;