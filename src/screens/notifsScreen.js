import { View } from 'tamagui';
import { NotifsHeader } from '../components/common/notifsScreen/header';

const NotifsScreen = () => {
  return (
    <View flex={1} backgroundColor="$bg">
      <NotifsHeader />
    </View>
  );
};

export default NotifsScreen; 
