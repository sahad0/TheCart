import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {COLOR, MARGIN, SET_PRODUCT_LIST_ACTIONS} from '../../constant';
import {useDispatch} from 'react-redux';

const CartProductCard = ({cartItemObj, index, cartItemsAsObj = {}}) => {
  const dispatch = useDispatch();

  const handleRemoveItemFromCart = sku_id => {
    dispatch({
      type: SET_PRODUCT_LIST_ACTIONS.REMOVE_ITEM_FROM_CART,
      payload: {idToRemove: sku_id},
    });
  };

  return (
    <View
      style={{
        borderWidth: 0.5,
        borderColor: COLOR.BORDER_DASHBOARD,
        padding: 10,
        flexDirection: 'row',
      }}>
      <FastImage
        style={styles.logo}
        source={require('../assets/tomato.png')}
        resizeMode={FastImage.resizeMode.contain}
      />
      <View>
        <Text
          numberOfLines={1}
          style={[styles.welcomeText, styles.extraMed, styles.vtext]}>
          {cartItemsAsObj?.[cartItemObj?.['gtin']]?.name}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text
            numberOfLines={1}
            style={[styles.welcomeText, styles.extraMed, styles.vtext]}>
            {(cartItemObj?.count || '') +
              ' X ' +
              cartItemsAsObj?.[cartItemObj?.['gtin']]?.mrp?.mrp +
              ' = ' +
              cartItemObj.price}
          </Text>
          <TouchableOpacity
            onPress={() => handleRemoveItemFromCart(cartItemObj?.['gtin'])}>
            <Text
              numberOfLines={1}
              style={[
                styles.welcomeText,
                styles.extraMed,
                {
                  marginTop: MARGIN.SMALL_7 * 3,
                  fontSize: 15,
                  paddingHorizontal: MARGIN.EXTRA_LARGE_24,
                  marginRight: MARGIN.EXTRA_LARGE,
                  textDecorationLine: 'underline',
                  color: COLOR.RED,
                },
              ]}>
              {'Remove'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  vtext: {
    marginTop: MARGIN.SMALL_7 * 3,
    fontSize: 15,
    paddingHorizontal: MARGIN.EXTRA_LARGE_24,
    marginRight: MARGIN.EXTRA_LARGE,
    color: COLOR.GRAY900,
  },
  logo: {
    width: 80,
    height: 80,
    marginTop: MARGIN.EXTRA_LARGE_24,
    marginBottom: 0,
    marginLeft: MARGIN.SMALL_7 * 2,
  },
});

export default CartProductCard;
