const LOAD = 'watchlist/LOAD'

const loadWatchlists = watchlists => ({
  type: LOAD,
	watchlists
})

export const getWatchlists = () => async (dispatch) => {
	const response = await fetch(`/api/watchlists`);
	if (response.ok) {
		const watchlists = await response.json();
		dispatch(loadWatchlists(watchlists));
	}
};

const watchlistReducer = (state = {}, action) => {
	switch (action.type) {
		case LOAD:
			let newState = {...state, ...action.watchlists };
			return newState;
		default:
			return state;
	}
}

export default watchlistReducer;