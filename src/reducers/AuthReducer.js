export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const authInitialState = {
  isLogin: false,
  user: {},
  loading: true,
};

export const authReducer = (state = authInitialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLogin: true,
        user: action.payload.user,
        loading: false,
      };
    case LOGOUT:
      return {
        ...authInitialState,
        loading: false,
      };
    default:
      return state;
  }
};
