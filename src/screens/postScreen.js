import UserCard from "@components/common/blogsScreen/userCard";
import { YStack, View, Button, useTheme } from "tamagui";
import useFetchUser from "@hooks/useFetchUser";
import useInsets from "@hooks/ui/useInsets";
import Icon from "@components/ui/icon";
import { useNavigation } from "@react-navigation/native";

export default function PostScreen({ route }) {
  const navigation = useNavigation();
  const { post } = route.params;
  const { setPosts } = route.params;
  const theme = useTheme();
  const { user } = useFetchUser(post?.author_id);
  const insets = useInsets();

  const color = theme.color.get();

  return (
    <YStack pt={insets.top} flex={1} backgroundColor="$bg">
      <UserCard active posts={[post]} user={user} setPosts={setPosts} />
      <View alignItems="flex-start" w="$full" pt="$6" pb={insets.bottom} ph="$6">
        <Button br="$full" backgroundColor="$backgroundTransparent" unstyled h="$12.5" w="$12.5" justifyContent="center" alignItems="center" onPress={() => navigation.goBack()}>
            <Icon icon="chevron.left" size={26} color={color} />
        </Button>
      </View>
    </YStack>
  );
}
