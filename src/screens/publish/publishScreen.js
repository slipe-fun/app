import { View, StyleSheet, Platform } from 'react-native';
import { COLORS, SPACING } from '../../constants/theme';
import { CaptureImage } from '../../components/common/publishScreen/captureImage';
import { useInsets } from '../../hooks/useInsets';

const PublishScreen = () => {
  const insets = useInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
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
