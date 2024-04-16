import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector, useDispatch} from 'react-redux';
import {COLOR, MARGIN, SET_PRODUCT_LIST_ACTIONS} from '../../constant';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import CartProductCard from '../components/CartProductCard';
import {getImageSource, getProductsAsObj} from '../utils/utils';
import {isEmpty} from 'lodash';

const StoreContainer = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {userAuth, userSubName, productList, cartItems, cartItemsAsObj} =
    useSelector(state => {
      const userObj = Object.values(state.cartReducer.auth);
      const userMetaArr =
        userObj?.[0]?.displayName?.split(' ')?.[userObj.length] || '';
      return {
        userAuth: userObj?.[0],
        userSubName: userMetaArr,
        productList: state.cartReducer.productList,
        cartItems: state.cartReducer.cartItems || {},
        cartItemsAsObj: state.cartReducer.cartItemsAsObj || {},
      };
    });

  const [showModal, setShowModal] = useState(false);

  const fetchItemsFromStore = async () => {
    const response = await fetch(
      'https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/filter/product',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page: '1',
          pageSize: '10',
          sort: {
            creationDateSortOption: 'DESC',
          },
        }),
      },
    );
    const dataItems = await response?.json(); // Parse response JSON
    dispatch({
      type: SET_PRODUCT_LIST_ACTIONS.SET_ITEMS,
      payload: dataItems?.products,
    });
    dispatch({
      type: SET_PRODUCT_LIST_ACTIONS.SET_PRODUCTS_AS_OBJ,
      payload: getProductsAsObj(dataItems?.products),
    });
  };

  useEffect(() => {
    fetchItemsFromStore();
  }, []);

  const renderItem = ({item, index}) => {
    let imageSource = getImageSource(index);
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ItemDetailsContainer', {item, index})
        }
        style={styles.itemOuter}>
        <FastImage
          style={styles.logo}
          source={imageSource}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 2}}>
            <Text numberOfLines={2} style={{padding: 10, color: COLOR.GRAY900}}>
              {item?.name || ''}
            </Text>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <MaterialCommunityIcons
              style={{marginRight: MARGIN.SMALL_4 * 4}}
              name="heart-outline"
              size={27}
              color={COLOR.BORDER_DASHBOARD}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
          <Text numberOfLines={2} style={styles.inrPadding}>
            {'INR'}
          </Text>
          <Text
            numberOfLines={2}
            style={{
              padding: 10,
              color: 'black',
              paddingLeft: 5,
              paddingRight: 0,
            }}>
            {item?.mrp?.mrp || ''}
          </Text>
          <Text
            numberOfLines={2}
            style={{padding: 10, color: COLOR.GRAY900, paddingLeft: 0}}>
            {'/item'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.outer}>
          <View
            style={{
              flexDirection: 'column',
              flex: 2,
            }}>
            <Text style={[styles.welcomeText, {marginBottom: 0}]}>Hello,</Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                numberOfLines={1}
                style={[
                  styles.welcomeText,
                  styles.extraMed,
                  {color: COLOR.GRAY900},
                ]}>
                {userSubName || 'Have some brownie !'}
              </Text>
            </View>
          </View>
          <View style={styles.iconHolder}>
            <TouchableOpacity onPress={() => setShowModal(true)}>
              {isEmpty(Object.values(cartItems ?? {})) ? null : (
                <View
                  style={{
                    position: 'absolute',
                    backgroundColor: 'red',
                    height: 15,
                    width: 15,
                    zIndex: 9999,
                    borderRadius: 99,
                  }}
                />
              )}
              <View>
                <MaterialCommunityIcons
                  style={{marginRight: MARGIN.SMALL_4 * 4}}
                  name="cart-outline"
                  size={27}
                  color={COLOR.BLACK_BANNER_TEXT}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('QRCameraViewContainer')}>
              <MaterialCommunityIcons
                name="barcode-scan"
                size={27}
                color={COLOR.BLACK_BANNER_TEXT}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        numColumns={2}
        data={productList}
      />

      {showModal ? (
        <Modal
          animationType="slide"
          visible={showModal}
          onRequestClose={() => {
            setShowModal(false);
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              numberOfLines={1}
              style={[
                styles.welcomeText,
                styles.extraMed,
                {
                  marginTop: MARGIN.SMALL_7 * 3,
                  fontSize: 20,
                },
              ]}>
              {'CART'}
            </Text>
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={{marginRight: MARGIN.SMALL_7 * 3}}>
              <MaterialCommunityIcons
                name="close"
                size={30}
                color={COLOR.BLACK}
              />
            </TouchableOpacity>
          </View>
          <ScrollView style={{flex: 1}}>
            {isEmpty(Object.values(cartItems ?? {})) ? (
              <Text
                numberOfLines={1}
                style={[
                  styles.welcomeText,
                  styles.extraMed,
                  {
                    marginTop: MARGIN.SMALL_7 * 3,
                    fontSize: 20,
                  },
                ]}>
                {'No Items Added.'}
              </Text>
            ) : (
              Object.values(cartItems ?? {})?.map((cartItemObj, index) => (
                <CartProductCard
                  key={index}
                  cartItemObj={cartItemObj}
                  index={index}
                  cartItemsAsObj={cartItemsAsObj}
                />
              ))
            )}
          </ScrollView>
        </Modal>
      ) : null}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  inrPadding: {padding: 10, color: COLOR.GRAY400, paddingRight: 0},
  itemOuter: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: COLOR.BORDER_DASHBOARD,
    justifyContent: 'center',
    margin: 5,
    borderRadius: 10,
  },
  extraMed: {
    marginTop: 0,
    fontSize: 16,
    fontFamily: 'Ubuntu-Medium',
    color: COLOR.GRAY900,
    fontWeight: '300',
  },
  iconHolder: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: MARGIN.SMALL_7 * 2,
    flexDirection: 'row',
  },
  outer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBlockColor: COLOR.BORDER_DASHBOARD,
    backgroundColor: COLOR.WHITE,
  },
  extraText: {
    marginTop: 0,
    fontSize: 15,
    color: '#e2619f',
    fontWeight: '100',
  },
  welcomeText: {
    fontSize: 25,
    color: COLOR.BLACK,
    fontFamily: 'Ubuntu-Medium',
    margin: MARGIN.LITTLE_LARGE,
    marginLeft: MARGIN.MEDIUM_16,
  },
  subContainer: {height: 100},
  container: {flex: 1, padding: 10, backgroundColor: COLOR.WHITE},
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: MARGIN.EXTRA_LARGE_24 * 5,
    marginBottom: 0,
  },
});
export default StoreContainer;
