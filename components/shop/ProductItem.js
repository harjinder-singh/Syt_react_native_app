import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native';

import Card from '../UI/Card';
import Url from '../../constants/ApiUrl';

const ProductItem = props => {
  
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  let username, userImageUrl;
  for(let key in props.users){
    if(props.users[key].id == props.userId){
      username = props.users[key].username;
      //console.log(props.users[key].imageUrl)
      userImageUrl = props.users[key].imageUrl;
    }
  }
  //console.log(userImageUrl)
  let item_date = new Date(props.created_at);
  let formatted_date = item_date.getDate() + "-" + (item_date.getMonth() + 1) + "-" + item_date.getFullYear() + " " + item_date.getHours() + ":" + item_date.getMinutes() + ":" + item_date.getSeconds()
  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View>
            <View style={styles.imageHeader}>
              <Image style={styles.imageProfile} source={{ uri: `${Url.webUrl}/media/${userImageUrl}` }} />
              <Text style={styles.username}>{username}</Text>
            </View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: `${Url.webUrl}/media/${props.image}` }} />
            </View>
            {/* <View style={styles.details}>
              <Text style={styles.title}>{props.description}</Text>
              <Text style={styles.price}>{formatted_date}</Text>
            </View> */}
            {/* <View style={styles.actions}>
              {props.children}
            </View> */}
          </View>
        </TouchableCmp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 500,
    margin: 20
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden'
  },
  imageContainer: {
    width: '100%',
    height: '85%',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  details: {
    alignItems: 'center',
    height: '17%',
    padding: 5
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    marginVertical: 2
  },
  price: {
    fontFamily: 'open-sans',
    fontSize: 14,
    color: '#888'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '15%',
    paddingHorizontal: 20
  },
  imageHeader:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '15%',
    paddingHorizontal: 10,
  },
  imageProfile:{
    width: '10%',
    height: '45%',
    borderRadius: 20,
  
  },
  username:{
    fontFamily: 'open-sans',
    fontSize: 16,
    color: '#888',
    marginLeft:10
  }
});

export default ProductItem;
