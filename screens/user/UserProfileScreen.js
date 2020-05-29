import React, {useState, useEffect, useCallback } from 'react';
import { View, 
  Text, 
  Platform, 
  StyleSheet,
  RefreshControl, 
  ActivityIndicator, 
  Image,
  ScrollView,
  FlatList,
  Button,
  AsyncStorage} from 'react-native';
import { useSelector, useDispatch} from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import UserItem from '../../components/shop/UserItem';
import Colors from '../../constants/Colors';
import Url from '../../constants/ApiUrl';
import * as userActions from '../../store/actions/user';
import * as imagesActions from '../../store/actions/images';


const UserProfileScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const userImages = useSelector(state => state.images.userImages);
  const follower = useSelector(state => state.user.userFollowers);
  const following = useSelector(state => state.user.userFollowing);
  const username = useSelector(state => state.auth.username);
  const imageUrl = useSelector(state => state.auth.imageUrl);
  const dispatch = useDispatch();

  const loadProfile = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(userActions.fetchProfile());
      await dispatch(imagesActions.fetchImages());
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    setIsLoading(true);
    loadProfile().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProfile]);


  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          onPress={loadProfile}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  const selectItemHandler = (id, title) => {
    props.navigation.navigate('ImageDetail', {
      imageId: id
    });
  };

  return (
    <View style={styles.scroll}>
      <View style={styles.actions}>
        <View>
          <Image style={styles.imageProfile} source={{ uri: `${Url.webUrl}${imageUrl}`}}/>
          <Text>{username}</Text>
        </View>
        
        <View><Text style={styles.statsText}>{userImages.length}</Text><Text>Posts</Text></View>
        <View><Text style={styles.statsText}>{follower.length}</Text><Text>Followers</Text></View>
        <View><Text style={styles.statsText}>{following.length}</Text><Text>Following</Text></View>
      </View>
      <View style={styles.container}>
        <FlatList
          style={styles.listContainer}
          onRefresh={loadProfile}
          refreshing={false}
          data={userImages}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          renderItem={itemData => (
            <UserItem
              image={itemData.item.imageUrl}
              description={itemData.item.description}
              createdAt={itemData.item.createdAt}
              onSelect={() => {
                selectItemHandler(itemData.item.id, itemData.item.description);
              }}
            >
            </UserItem>
          )}
        />
      </View>
    </View>
  );
};

UserProfileScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Profile ',
    headerLeft:() => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
    width:'100%'
  },
  listContainer: {
    flex: 1,
    padding: 5,
    width:'100%'
  },
  scroll:{
    height: '100%',
    width: '100%'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '15%',
    paddingHorizontal: 20
  },
  imageProfile:{
    width: 60,
    height: 60,
    borderRadius: 20,
  
  },
  statsText: {
    textAlign: 'center',
    fontSize:20,
    fontWeight:'bold'
  }
});

export default UserProfileScreen;
