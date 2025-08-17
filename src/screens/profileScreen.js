import { View } from "tamagui";
import useFetchUser from "../hooks/useFetchUser";
import { useSharedValue } from "react-native-reanimated";
import ProfilePostsList from "@components/common/profileScreen/postsList";
import ProfileHeader from "@components/common/profileScreen/header";

const ProfileScreen = ({ route }) => {
  const { user, isLoading, error } = useFetchUser(route?.params?.id);

  const scrollY = useSharedValue(0);

  return (  
    <View flex={1} backgroundColor="$bg">
      <ProfileHeader isScreen={!!route?.params?.id} scrollY={scrollY} user={user} />  
      <ProfilePostsList scrollY={scrollY} user={user} isScreen={!!route?.params?.id} />
    </View>
  );
};

export default ProfileScreen;
