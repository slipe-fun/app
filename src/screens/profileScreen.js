import { View } from "tamagui";
import useFetchUser from "../hooks/useFetchUser";
import UserBlock from "@components/common/profileScreen/userBlock";
import { useSharedValue } from "react-native-reanimated";
import { useState, memo } from "react";
import ProfileAvatar from "@components/common/profileScreen/userBlock/avatar";
import ProfilePostsList from "@components/common/profileScreen/postsList";

const ProfileScreen = () => {
  const { user, isLoading, error } = useFetchUser();
  const [actionsHeight, setActionsHeight] = useState(0);
  const scrollY = useSharedValue(0);
  const [viewHeight, setViewHeight] = useState(0);

  return (
    <View flex={1} backgroundColor="$bg">
      <ProfileAvatar
        viewHeight={viewHeight}
        actionsHeight={actionsHeight}
        scrollY={scrollY}
        user={user}
      />
      <UserBlock
        actionsHeight={actionsHeight}
        setViewHeight={setViewHeight}
        viewHeight={viewHeight}
        setActionsHeight={setActionsHeight}
        scrollY={scrollY}
        user={user}
      />
      <ProfilePostsList
        scrollY={scrollY}
        actionsHeight={actionsHeight}
        viewHeight={viewHeight}
        user={user}
      />
    </View>
  );
};

export default memo(ProfileScreen);
