// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const EDIT_BUYINGPOWER =  'session/EDIT_BUYINGPOWER';
const EDIT_PROFILEIMAGE =  'session/EDIT_PROFILEIMAGE';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const editBuyingPower = (user) => ({
  type: EDIT_BUYINGPOWER,
  user
});

const editProfileImage = (user) => ({
  type: EDIT_PROFILEIMAGE,
  user
});

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
  
    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (username, email, password, buying_power, profile_image) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
      buying_power,
      profile_image,
    }),
  });
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const buyingPower = ({user_id, new_buying_power}) => async (dispatch) => {
  const response = await fetch(`/api/users/${user_id}/buyingpower`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parseFloat(new_buying_power.toFixed(2))),
  });
  if (response.ok) {
    const user = await response.json();
    dispatch(editBuyingPower(user));
    return user;
  }
}

export const profileImage = ({user_id, formData}) => async (dispatch) => {
  try {
    const response = await fetch(`/api/users/${user_id}/profile_image`, {
      method: "PATCH",
      body: formData,
    });
    if (response.ok) {
      const user = await response.json();
      dispatch(editProfileImage(user));
      return user;
    } else {
      throw response;
    }
  } catch (e) {
    return e;
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case REMOVE_USER:
      return { user: null }
    case EDIT_BUYINGPOWER:
      return { ...state, user: {...state.user, buying_power: action.user.buying_power}}
    case EDIT_PROFILEIMAGE:
      return { ...state, user: {...state.user, profile_image: action.user.profile_image}}
    default:
      return state;
  }
}
