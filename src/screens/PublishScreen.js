import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/Theme';

const PublishScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{ color: colors.white }}>Publish</Text>
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

export default PublishScreen; 