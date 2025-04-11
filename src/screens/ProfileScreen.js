import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/Theme';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{ color: colors.white }}>Profile</Text>
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

export default ProfileScreen; 