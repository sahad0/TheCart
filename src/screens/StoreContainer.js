import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {COLOR, MARGIN} from '../../constant';

const StoreContainer = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.welcomeText}>Hello</Text>
        {/* <FontAwesome
          style={{marginTop: 20}}
          name="rocket"
          size={30}
          color="#900"
        /> */}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 25,
    color: COLOR.BLACK,
    fontWeight: '800',
    fontFamily: 'Ubuntu-Medium',
    margin: MARGIN.LITTLE_LARGE,
  },
  subContainer: {height: 100},
  container: {flex: 1, margin: 10},
});
export default StoreContainer;
