import { AsyncStorage } from 'react-native';
import Url from '../../constants/ApiUrl';
export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;

export const authenticate = (token, userId, username, imageUrl) => {
  return dispatch => {
    dispatch({ type: AUTHENTICATE, token: token, userId: userId, username: username, imageUrl: imageUrl});
  };
};

export const login = (username, password) => {
  return async dispatch => {
    const response = await fetch(
      `${Url.production}login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      console.log(errorResData);
      throw new Error('Something went wrong!!');
    }

    const resData = await response.json();
    console.log(resData);
    dispatch(
      authenticate(
        resData.token,
        resData.user_id,
        resData.username,
        resData.image_url
      )
    );
    saveDataToStorage(resData.token, resData.user_id, resData.username, resData.image_url); 
  };
};

 export const logout = () => {
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};

const saveDataToStorage = (token, userId, username, imageUrl) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      username: username,
      imageUrl: imageUrl
    })
  );
};
