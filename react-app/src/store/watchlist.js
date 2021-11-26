// TYPE //
const LOAD = 'watchlist/LOAD'
const CREATE = 'watchlist/CREATE'
const DELETE = 'watchlist/REMOVE'

// ACTION //
const load = watchlists => ({
	type: LOAD,
	watchlists
});

const create = watchlist => ({
	type: CREATE,
	watchlist
});

const remove = watchlist => ({
	type: DELETE,
	watchlist
});

// THUNK //
export const getWatchlists = () => async (dispatch) => {
	const response = await fetch(`/api/watchlists/`);
	if (response.ok) {
		const watchlists = await response.json();
		dispatch(load(watchlists));
		return watchlists;
	}
};

export const createWatchlist = (watchlist) => async (dispatch) => {
	const response = await fetch(`/api/watchlists/`, {
		method: 'POST',
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(watchlist),
	});
	if (response.ok) {
		const newWatchlist = await response.json();
		dispatch(create(newWatchlist));
		return newWatchlist;
	}
};

export const removeWatchlist = (watchlist_id) => async (dispatch) => {
	const response = await fetch(`/api/watchlists/${watchlist_id}`, {
		method: 'DELETE',
	});
	if (response.ok) {
		const toDelete = await response.json();
		dispatch(remove(toDelete));
	}
};

// REDUCER //
const watchlistReducer = (state = {}, action) => {
	switch (action.type) {
		case LOAD:
			let newState = {...state, ...action.watchlists};
			return newState;
		case CREATE:
			return {...state, watchlists: [...state.watchlists, action.watchlist]};
		case DELETE:
			const toDelete = {...state};
			toDelete.watchlists.forEach((ele, index) => {
				if (ele.id === action.watchlist.id) {
					toDelete.watchlists.splice(index, 1)
				} 
			})
			return toDelete
		default:
			return state;
	}
};

export default watchlistReducer;