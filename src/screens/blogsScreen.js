import { Platform, View } from "react-native";
import { COLORS } from "../constants/theme";
import VerticalSlider from "../components/ui/verticalSlider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import UserCard from "../components/common/blogsScreen/userCard";
import { useFetchUsers } from "../hooks/useFetchUsers";

const BlogsScreen = () => {
	const insets = useSafeAreaInsets();

	const { users, handleFetchUsers } = useFetchUsers();

	async function handleSlideChange(currentSlide) {
		if (currentSlide === Object.keys(users).length - 2) handleFetchUsers();
	}

	return (
		<View style={{ flex: 1, paddingTop: Platform.OS === "ios" ? insets.top - 2 : insets.top + 6, backgroundColor: COLORS.black }}>
			<VerticalSlider onSlideChange={handleSlideChange} users={users} RenderSlideComponent={({ user, posts, active }) => <UserCard user={user} posts={posts} active={active} />} />
		</View>
	);
};

export default BlogsScreen;
