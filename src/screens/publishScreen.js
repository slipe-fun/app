import { View, Text, StyleSheet, Platform } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CaptureImage } from '../components/common/publishScreen/captureImage';

const PublishScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: Platform.OS === "ios" ? insets.top - 4 : insets.top + 6 }]}>
     <CaptureImage/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: SPACING.large,
    backgroundColor: COLORS.black,
  },
});

export default PublishScreen; 
