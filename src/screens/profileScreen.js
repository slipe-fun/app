import { View, StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";
import BlurredGlassEffect from "../components/ui/glassBlur";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <BlurredGlassEffect />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: COLORS.black,
  },
});

export default ProfileScreen;
