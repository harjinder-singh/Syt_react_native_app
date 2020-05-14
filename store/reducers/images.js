import {
  SET_IMAGES
} from '../actions/images';

const initialState = {
  availableImages: [],
  availableUsers:[],
  userImages: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_IMAGES:
      return {
        availableImages: action.images,
        availableUsers: action.users,
        userImages: action.userImages
      };
    default:
      return state;
  }
  return state;
};
