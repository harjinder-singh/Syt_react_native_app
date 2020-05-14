import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  Platform,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import * as imagesActions from '../../store/actions/images';
import Colors from '../../constants/Colors';

const ImagesOverviewScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const images = useSelector(state => state.images.availableImages);
  const users = useSelector(state => state.images.availableUsers);
  const dispatch = useDispatch();

  const loadImages = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(imagesActions.fetchImages());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    setIsLoading(true);
    loadImages().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadImages]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate('ImageDetail', {
      imageId: id
    });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          onPress={loadImages}
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

  if (!isLoading && images.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No images found. Maybe start adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadImages}
      refreshing={false}
      data={images}
      keyExtractor={item => item.id.toString()}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          description={itemData.item.description}
          createdAt={itemData.item.createdAt}
          userId = {itemData.item.userId}
          users = {users}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.description);
          }}
        >
        </ProductItem>
      )}
    />
  );
};
ImagesOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Home',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});

export default ImagesOverviewScreen;