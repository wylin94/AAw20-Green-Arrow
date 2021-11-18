//////////// TYPE ////////////
const LOAD = 'portfolio/LOAD'
const CREATE = 'portfolio/CREATE'

/////////// ACTION /////////////

const loadPortfolios = portfolios => ({
	type: LOAD,
	portfolios
})

const create = portfolio => ({
	type: CREATE,
	portfolio
})

/////////// THUNK /////////////

export const getPortfolios = () => async (dispatch) => {
	const response = await fetch(`/api/portfolios`);
	if (response.ok) {
		const portfolios = await response.json();
		dispatch(loadPortfolios(portfolios));
	}
};

export const createPortfolio = (stock) => async (dispatch) => {
	const response = await fetch('/api/portfolios/', {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(stock),
	})
	if (response.ok) {
		const newPortfolio = await response.json();
		console.log('***************')
		console.log(newPortfolio)
		dispatch(create(newPortfolio));
		return newPortfolio;
	}
};

////////// REDUCER //////////////

const portfolioReducer = (state = {}, action) => {
	switch (action.type) {
		case LOAD:
			let newState = {...state, ...action.portfolios};
			return newState;
		case CREATE:
			let newStates = {...state, portfolios: [...state.portfolios, action.portfolio]};
			return newStates;
		default:
			return state;
	}
}

export default portfolioReducer;