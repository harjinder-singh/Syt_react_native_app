import { AUTHENTICATE, LOGOUT } from '../actions/auth';

const initialState = {
  token: null,
  userId: null,
  username: null,
  imageUrl: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        username: action.username,
        imageUrl: action.imageUrl
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
