import { View } from "tamagui";
import useFetchUser from "../hooks/useFetchUser";
import { useSharedValue } from "react-native-reanimated";
import ProfilePostsList from "@components/common/profileScreen/postsList";
import { useProfileStore } from "@stores/profileScreen";
import { useEffect } from "react";
import ProfileHeader from "@components/common/profileScreen/header";

const ProfileScreen = () => {
  const { user, isLoading, error } = useFetchUser();
  
  const setUser = useProfileStore((state) => state.setUser);  

  const scrollY = useSharedValue(0);

  useEffect(() => {
    setUser(user);
    console.log(user);  
  }, [user]); 

  return (  
    <View flex={1} backgroundColor="$bg">
      <ProfileHeader back scrollY={scrollY} />  
      <ProfilePostsList scrollY={scrollY} />
    </View>
  );
};

export default ProfileScreen;
