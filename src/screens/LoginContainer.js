import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {COLOR, FONT_SIZE, LOGIN_ACTIONS, MARGIN} from '../../constant';
import {SafeAreaView} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';

const LoginContainer = () => {
  const dispatch = useDispatch();

  GoogleSignin.configure({
    webClientId:
      '855982703073-0v1f1f9phnm2n94cmu7kbcrkcg50jjn1.apps.googleusercontent.com',
  });

  const onGoogleButtonPress = async () => {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <FastImage
          style={styles.logo}
          source={require('../assets/grocery_post.png')}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text style={styles.logoBannerText}>
          Where groceries are met at doorstep.
        </Text>
        <Text style={styles.logoBannerText}>Grab On!</Text>

        <View style={styles.loginContainer}>
          <View style={styles.miniContainer}>
            <Text
              style={[
                styles.logoBannerText,
                {
                  alignSelf: 'center',
                  color: COLOR.LIGHT_YELLOWISH,
                  fontSize: 20,
                  fontStyle: 'italic',
                },
              ]}>
              #############
            </Text>
          </View>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: COLOR.DARK_PINK_OPACITY_1,
              alignItems: 'center',
            }}
            onPress={onGoogleButtonPress()
              .then(() => {
                const userDetails =
                  auth().currentUser?.['_auth']?.['_nativeModule']?.[
                    'APP_USER'
                  ];
                dispatch({
                  type: LOGIN_ACTIONS.SET_AUTH_DETAILS,
                  payload: userDetails,
                });
              })
              .catch(err => console.log(err))}>
            <FastImage
              style={{
                height: 90,
                width: 90,
                borderRadius: 28,
                alignSelf: 'center',
                marginTop: MARGIN.EXTRA_LARGE_24,
              }}
              source={require('../assets/google.png')}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  miniContainer: {
    flex: 2,
    marginTop: MARGIN.EXTRA_LARGE_24 * 3,
  },
  extraText: {marginTop: 70, textDecorationLine: 'underline'},
  loginContainer: {
    flexDirection: 'row',
    backgroundColor: '#fec5e5',
    height: 300,
    marginTop: MARGIN.SMALL_7 * 20,
  },
  logoBannerText: {
    fontSize: FONT_SIZE.SUBTEXT_LARGE * 1.1,
    alignSelf: 'center',
    fontWeight: '400',
    color: COLOR.TEXT_BLACK,
  },
  logo: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    marginTop: MARGIN.EXTRA_LARGE_24 * 5,
    marginBottom: 0,
  },
  subContainer: {backgroundColor: 'white', flex: 1},
  container: {flex: 1},
});

export default LoginContainer;
