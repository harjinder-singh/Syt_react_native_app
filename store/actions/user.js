import Image from '../../models/image';
import User from '../../models/user';
import Follower from '../../models/follower';
import Url from '../../constants/ApiUrl';

export const SET_FOLLOWERS = 'SET_FOLLOWERS';

export const fetchProfile = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    console.log('Token is' + token);
    try {
      const response = await fetch(
        `${Url.production}profile`,
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

      let followersData = resData.followers;
      let followingData = resData.following;
      const followers = [];
      const following = [];

      for (const key in followersData) {
        followers.push(
          new Follower(
            followersData[key].id,
            followersData[key].follower,
            followersData[key].following,
            followersData[key].created_at,
            followersData[key].updated_at
          )
        );
      }
      
      for (const key in followingData) {
        following.push(
          new Follower(
            followingData[key].id,
            followingData[key].follower,
            followingData[key].following,
            followingData[key].created_at,
            followingData[key].updated_at
          )
        );
      }
      
      dispatch({
        type: SET_FOLLOWERS,
        userFollowers : followers,
        userFollowing : following
      });
    } catch (err) {
      throw err;
    }
  };
};