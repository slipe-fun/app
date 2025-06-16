import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from "../constants/theme";
import { Image } from 'tamagui';
import useFetchUser from '../hooks/useFetchUser';

const ProfileScreen = () => {
  const { user, isLoading, error } = useFetchUser();
  
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/test/bg-example.png')}
        style={styles.backgroundImage}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  shaderView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});
