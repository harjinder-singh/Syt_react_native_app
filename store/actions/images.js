import Image from '../../models/image';
import User from '../../models/user';
import { combineReducers } from 'redux';
import Url from '../../constants/ApiUrl';

export const DELETE_IMAGE = 'DELETE_IMAGE';
export const CREATE_IMAGE = 'CREATE_IMAGE';
export const UPDATE_IMAGE = 'UPDATE_IMAGE';
export const SET_IMAGES = 'SET_IMAGES';

export const fetchImages = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    console.log('Token is' + token);
    try {
      const response = await fetch(
        `${Url.production}images`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          }
        }
      );
      
      if (!response.ok) {
        const resData = await response.json();
        console.log(resData);
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      

      images = resData.images;
      usersData = resData.users;
      const loadedImages = [];
      const users = [];

      for (const key in images) {
        loadedImages.push(
          new Image(
            images[key].id,
            images[key].user,
            images[key].pic,
            images[key].description,
            images[key].created_at
          )
        );
      }

      for (const key in usersData) {
        users.push(
          new User(
            usersData[key].id,
            usersData[key].username,
            usersData[key].pic
          )
        );
      }
      
      dispatch({
        type: SET_IMAGES,
        images: loadedImages,
        users: users,
        userImages: loadedImages.filter(prod => prod.userId === userId)
      });
    } catch (err) {
      throw err;
    }
  };
};