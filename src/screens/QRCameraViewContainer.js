import {
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {MARGIN} from '../../constant';
import {useSelector} from 'react-redux';
import {isEmpty} from 'lodash';

const QRCameraViewContainer = () => {
  const navigation = useNavigation();

  const {cartItemsAsObj} = useSelector(state => {
    return {
      cartItemsAsObj: state.cartReducer.cartItemsAsObj || {},
    };
  });

  const onSuccess = e => {
    const item = cartItemsAsObj?.[e.data?.toString?.() || e.data] || {};
    if (isEmpty(item)) {
      ToastAndroid.show(` Product not Found !`, ToastAndroid.SHORT);
      return navigation?.goBack?.();
    }
    return navigation.navigate('ItemDetailsContainer', {
      item,
      index: item?.index,
    });

    // return navigation?.goBack?.();
  };
  return (
    <QRCodeScanner
      onRead={onSuccess}
      flashMode={RNCamera.Constants.FlashMode.torch}
      topContent={
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 40,
          }}>
          <Text style={styles.centerText}>
            Go on <Text style={styles.textBold}>Scan QR Code</Text> on your
            device . Works when gtin number matches the product.
          </Text>
          <TouchableOpacity
            onPress={() => navigation?.goBack?.()}
            style={{marginRight: MARGIN.SMALL_7 * 3}}>
            <MaterialCommunityIcons name="close" size={30} />
          </TouchableOpacity>
        </View>
      }
    />
  );
};
const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default QRCameraViewContainer;
