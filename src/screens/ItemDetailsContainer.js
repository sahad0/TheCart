import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLOR, MARGIN, SET_PRODUCT_LIST_ACTIONS} from '../../constant';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation, useRoute} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {isEqual, omit} from 'lodash';

const ItemDetailsContainer = ({item = {}}) => {
  const navigation = useNavigation();
  const routeParams = useRoute().params;
  const dispatch = useDispatch();

  const {cartItems} = useSelector(state => {
    return {
      cartItems: state.cartReducer.cartItems,
    };
  });
  const {
    name,
    mrp: {mrp},
    main_category,
    created_by,
    sku_code,
  } = routeParams?.item || {};

  const initialState = cartItems?.[sku_code]
    ? omit(cartItems?.[sku_code], 'sku_code')
    : null || {count: 0, price: 0};
  const [quanity, setQuantity] = useState(initialState);

  const handleIncDecPress = type => {
    if (type === 'DEC') {
      return setQuantity(prevState => {
        const updatedCount = prevState.count - 1;
        if (updatedCount < 0) {
          return prevState;
        }
        return {
          count: updatedCount,
          price: mrp * updatedCount,
        };
      });
    }
    setQuantity(prevState => {
      const updatedCount = prevState.count + 1;
      if (updatedCount > 10) {
        ToastAndroid.show('Product Limit Reached !', ToastAndroid.SHORT);
        return prevState;
      }
      return {
        count: updatedCount,
        price: mrp * updatedCount,
      };
    });
  };

  const handleAddToCart = () => {
    dispatch({
      type: SET_PRODUCT_LIST_ACTIONS.SET_CART_ITEMS,
      payload: {[sku_code]: Object.assign(quanity, {sku_code})},
    });
    return navigation.navigate('StoreContainer');
  };

  const isButtonDisabled =
    quanity.count === 0 || isEqual(initialState, quanity);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLOR.WHITE, padding: 20}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity
          onPress={() => navigation?.goBack?.()}
          style={styles.button}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={40}
            color={COLOR.GRAY900}
          />
        </TouchableOpacity>
        <Text
          numberOfLines={2}
          style={{
            padding: 10,
            color: COLOR.GRAY900,
            marginTop: MARGIN.SMALL_6 * 2.5,
            fontSize: 18,
            paddingBottom: 0,
          }}>
          {'#'.concat(routeParams?.index) || ''}
        </Text>
      </View>
      <Text
        numberOfLines={2}
        style={{
          padding: 10,
          color: COLOR.GRAY900,
          marginTop: MARGIN.SMALL_6 * 2.5,
          fontSize: 18,
          paddingBottom: 0,
        }}>
        {name || ''}
      </Text>
      <Text
        numberOfLines={2}
        style={{
          color: COLOR.GRAY900,
          marginTop: MARGIN.EXTRA_LARGE_24,
          alignSelf: 'flex-end',
          marginRight: MARGIN.EXTRA_LARGE * 1.5,
        }}>
        {`- by ${created_by}`}
      </Text>
      <FastImage
        style={styles.logo}
        source={require('../assets/tomato.png')}
        resizeMode={FastImage.resizeMode.contain}
      />
      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
          <TouchableOpacity
            onPress={() => handleIncDecPress('DEC')}
            style={{margin: 10}}>
            <Text
              style={{
                fontSize: 30,
                color: COLOR.BLACK_BANNER_TEXT,
                backgroundColor: COLOR.BORDER_DASHBOARD,
                borderRadius: 9999,
                padding: 2,
                alignItems: 'center',
                paddingHorizontal: 18,
              }}>
              -
            </Text>
          </TouchableOpacity>
          <View style={{margin: 10}}>
            <Text
              style={{
                fontSize: 30,
                color: COLOR.BLACK_BANNER_TEXT,
                fontWeight: '200',
              }}>
              {quanity.count || 0}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => handleIncDecPress('INC')}
            style={{margin: 10}}>
            <Text
              style={{
                fontSize: 30,
                color: COLOR.BLACK_BANNER_TEXT,
                backgroundColor: COLOR.GRAY200,
                borderRadius: 999999,
                padding: 2,
                alignItems: 'center',
                paddingHorizontal: 14,
              }}>
              +
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{color: COLOR.GRAY900, alignSelf: 'flex-end'}}>
            {'INR'}
          </Text>
          <Text
            style={{
              color: COLOR.BLACK_BANNER_TEXT,
              fontSize: 25,
              alignSelf: 'flex-end',
            }}>
            {quanity.price || 0}
          </Text>
        </View>
      </View>
      <Text
        style={{
          color: COLOR.BLACK_BANNER_TEXT,
          fontSize: 15,
          marginTop: MARGIN.SMALL_7 * 2,
        }}>
        {'Description :'}
      </Text>
      <Text
        style={{
          color: COLOR.BLACK_BANNER_TEXT,
          fontSize: 15,
          marginTop: MARGIN.SMALL_7 * 2,
        }}>
        {'#'.concat(main_category)}
      </Text>
      <TouchableOpacity
        onPress={handleAddToCart}
        disabled={isButtonDisabled}
        style={{
          flex: 1,
          backgroundColor: isButtonDisabled
            ? COLOR.BORDER_DASHBOARD
            : COLOR.BLACK,
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 25,
          maxHeight: 60,
          borderRadius: 10,
        }}>
        <Text
          style={{
            color: COLOR.WHITE,
            fontSize: 15,
          }}>
          {'Add To Cart'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: COLOR.BORDER_DASHBOARD,
    justifyContent: 'center',
    alignSelf: 'flex-start',
    padding: 10,
    borderRadius: 9999,
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    marginTop: MARGIN.EXTRA_LARGE_24 * 2,
    marginBottom: 0,
  },
});

export default ItemDetailsContainer;
