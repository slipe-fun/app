import { View } from "tamagui";
import useFetchUser from "../hooks/useFetchUser";
import { useSharedValue } from "react-native-reanimated";
import ProfilePostsList from "@components/common/profileScreen/postsList";
import ProfileHeader from "@components/common/profileScreen/header";

const ProfileScreen = ({ route }) => {
  const { user, isLoading, error, setUser } = useFetchUser(route?.params?.id);
  const { user: mySelf } = useFetchUser();

  const scrollY = useSharedValue(0);

  return (  
    <View flex={1} backgroundColor="$bg">
      <ProfileHeader isScreen={route?.params?.isScreen} scrollY={scrollY} user={user} />  
      <ProfilePostsList scrollY={scrollY} user={{...user, setUser}} isScreen={route?.params?.isScreen ? user?.id !== mySelf?.id : false} />
    </View>
  );
};

export default ProfileScreen;
