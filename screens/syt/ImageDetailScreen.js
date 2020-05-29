import React from 'react';
import {
  ScrollView,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Url from '../../constants/ApiUrl';

const ImageDetailScreen = props => {
  const imageId = props.navigation.getParam('imageId');
  const selectedImage = useSelector(state =>
    state.images.availableImages.find(prod => prod.id === imageId)
  );
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: `${Url.webUrl}/media/${selectedImage.imageUrl}` }} />
      <Text style={styles.description}>{selectedImage.description}</Text>
    </ScrollView>
  );
};

ImageDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: "Hello there!!"
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center'
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'open-sans-bold'
  },
  description: {
    fontFamily: 'open-sans',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20
  }
});

export default ImageDetailScreen;
