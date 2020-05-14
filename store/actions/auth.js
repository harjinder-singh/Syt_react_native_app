import { AsyncStorage } from 'react-native';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;

export const authenticate = (token, userId) => {
  return dispatch => {
    dispatch({ type: AUTHENTICATE, token: token, userId: userId});
  };
};

export const login = (username, password) => {
  return async dispatch => {
    const response = await fetch(
      'http://showyourtalent.herokuapp.com/api/v1/login',
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
    dispatch(
      authenticate(
        resData.token,
        resData.user_id
      )
    );
    saveDataToStorage(resData.token, resData.user_id); 
  };
};

 export const logout = () => {
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};

const saveDataToStorage = (token, userId) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId
    })
  );
};
