import { View, StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";
import { requireNativeComponent } from "react-native";
import { Image } from "tamagui";

const LiveShaderView = requireNativeComponent('LiveShaderView');

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <LiveShaderView style={styles.shaderView} />
      <Image 
        source={require('../../assets/test/bg-example.png')} 
        style={styles.backgroundImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  shaderView: {
    flex: 1,
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

export default ProfileScreen;
