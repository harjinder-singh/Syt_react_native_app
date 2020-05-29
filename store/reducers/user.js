import {
    SET_FOLLOWERS
  } from '../actions/user';
  
  const initialState = {
    userFollowers: [],
    userFollowing: []
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case SET_FOLLOWERS:
        return {
            userFollowers: action.userFollowers,
            userFollowing: action.userFollowing
        };
      default:
        return state;
    }
    return state;
  };