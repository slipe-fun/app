import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/Theme';

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{ color: colors.white }}>Search</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
  },
});

export default SearchScreen; 