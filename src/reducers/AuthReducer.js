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
      };
    case LOGOUT:
      return {
        ...authInitialState,
      };
    default:
      return state;
  }
};
