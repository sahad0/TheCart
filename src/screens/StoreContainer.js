import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector, useDispatch} from 'react-redux';
import {
  COLOR,
  LOGIN_ACTIONS,
  MARGIN,
  SET_PRODUCT_LIST_ACTIONS,
} from '../../constant';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import CartProductCard from '../components/CartProductCard';
import {getCartSum, getImageSource, getProductsAsObj} from '../utils/utils';
import {isEmpty} from 'lodash';
import auth from '@react-native-firebase/auth';

const StoreContainer = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {productList, cartItems, cartItemsAsObj} = useSelector(state => {
    const userObj = Object.values(state.cartReducer.auth);
    return {
      userAuth: userObj?.[0],
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
        <View style={styles.flexRow}>
          <View style={styles.flex2}>
            <Text numberOfLines={2} style={styles.nameText}>
              {item?.name || ''}
            </Text>
          </View>
          <View style={styles.iconH}>
            <MaterialCommunityIcons
              style={{marginRight: MARGIN.SMALL_4 * 4}}
              name="heart-outline"
              size={27}
              color={COLOR.BORDER_DASHBOARD}
            />
          </View>
        </View>
        <View style={styles.flexbeg}>
          <Text numberOfLines={2} style={styles.inrPadding}>
            {'INR'}
          </Text>
          <Text numberOfLines={2} style={styles.slashText}>
            {item?.mrp?.mrp || ''}
          </Text>
          <Text numberOfLines={2} style={styles.slash}>
            {'/item'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const listHeader = () => {
    return (
      <>
        <Text
          numberOfLines={1}
          style={[
            styles.welcomeText,
            styles.extraMed,
            styles.welWidth,
            {fontSize: 20},
          ]}>
          {'Your Cart'}
        </Text>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View
            style={{
              padding: 10,
              borderWidth: 1,
              borderColor: COLOR.BORDER_DASHBOARD,
              flex: 1,
              borderRadius: 10,
            }}>
            <Text
              numberOfLines={3}
              style={[
                styles.welcomeText,
                styles.extraMed,
                {fontSize: 15, fontWeight: '100', alignSelf: 'flex-start'},
              ]}>
              {`${Object.keys(cartItems ?? {}).length || 0} Items`}
            </Text>
            <Text
              numberOfLines={3}
              style={[
                styles.welcomeText,
                styles.extraMed,
                {
                  fontSize: 15,
                  fontWeight: '100',
                  alignSelf: 'flex-start',
                  marginBottom: MARGIN.SMALL_6,
                  color: COLOR.BLACK,
                },
              ]}>
              {`${getCartSum(Object.values(cartItems ?? {})) || 0} INR/-`}
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text
              numberOfLines={1}
              style={[
                styles.welcomeText,
                styles.extraMed,
                styles.welWidth,
                {
                  fontSize: 20,
                  color: COLOR.BLACK_BANNER_TEXT,
                  textDecorationLine: 'underline',
                },
              ]}>
              {'CheckOut'}
            </Text>
          </View>
        </View>
        <Text
          numberOfLines={1}
          style={[styles.welcomeText, styles.extraMed, styles.welWidth]}>
          {'Recommended'}
        </Text>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.outer}>
          <View style={styles.col}>
            <Text style={[styles.welcomeText, styles.margin0]}>Hello,</Text>

            <View style={styles.flexRow}>
              <Text
                numberOfLines={1}
                style={[
                  styles.welcomeText,
                  styles.extraMed,
                  {color: COLOR.GRAY900},
                ]}>
                {auth()?.currentUser?.displayName || 'Have some brownie !'}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                auth()
                  .signOut()
                  .then(() => {
                    dispatch({
                      type: LOGIN_ACTIONS.SET_AUTH_DETAILS,
                      payload: {},
                    });
                    setTimeout(() => navigation.navigate('LoginScreen'), 1000);
                  })
                  .catch(err => {})
              }
              style={{
                justifyContent: 'center',
                marginLeft: MARGIN.EXTRA_LARGE_24 - 8,
                backgroundColor: COLOR.WHITE,
                marginBottom: MARGIN.SMALL,
              }}>
              <Text style={{color: COLOR.RED, textDecorationLine: 'underline'}}>
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.iconHolder}>
            <TouchableOpacity onPress={() => setShowModal(true)}>
              {isEmpty(Object.values(cartItems ?? {})) ? null : (
                <View style={styles.emptyStyle} />
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
                color={'black'}
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
        ListHeaderComponent={listHeader}
        ListEmptyComponent={() => <ActivityIndicator size="large" />}
      />

      {showModal ? (
        <Modal
          animationType="slide"
          visible={showModal}
          onRequestClose={() => {
            setShowModal(false);
          }}>
          <View style={styles.textHold}>
            <Text
              numberOfLines={1}
              style={[styles.welcomeText, styles.extraMed, styles.welWidth]}>
              {'CART'}
            </Text>
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={{marginRight: MARGIN.SMALL_7 * 3}}>
              <MaterialCommunityIcons name="close" size={30} color={'black'} />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.flex1}>
            {isEmpty(Object.values(cartItems ?? {})) ? (
              <Text
                numberOfLines={1}
                style={[
                  styles.welcomeText,
                  styles.extraMed,
                  styles.textMedium,
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
          <TouchableOpacity
            onPress={() => {}}
            style={{
              flex: 1,
              backgroundColor: COLOR.BLACK,
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 25,
              maxHeight: 60,
              borderRadius: 10,
              marginHorizontal: MARGIN.EXTRA_LARGE,
            }}>
            <Text
              style={{
                color: COLOR.WHITE,
                fontSize: 15,
              }}>
              {`Pay ${getCartSum(Object.values(cartItems))} INR/-`}
            </Text>
          </TouchableOpacity>
        </Modal>
      ) : null}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  flex1: {flex: 1},
  iconH: {flex: 1, alignItems: 'center'},
  flexbeg: {flexDirection: 'row', alignItems: 'flex-start'},
  slashText: {
    padding: 10,
    color: 'black',
    paddingLeft: 5,
    paddingRight: 0,
  },
  slash: {padding: 10, color: COLOR.GRAY900, paddingLeft: 0},
  nameText: {padding: 10, color: COLOR.GRAY900},
  flex2: {flex: 2},
  col: {
    flexDirection: 'column',
    flex: 2,
  },
  margin0: {marginBottom: 0},
  flexRow: {flexDirection: 'row'},
  emptyStyle: {
    position: 'absolute',
    backgroundColor: 'red',
    height: 15,
    width: 15,
    zIndex: 9999,
    borderRadius: 99,
  },
  welWidth: {
    marginTop: MARGIN.SMALL_7 * 3,
    fontSize: 20,
  },
  textHold: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textMedium: {
    marginTop: MARGIN.SMALL_7 * 3,
    fontSize: 20,
  },
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
  subContainer: {height: 120},
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
