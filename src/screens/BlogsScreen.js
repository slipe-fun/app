import { View } from "react-native";
import { COLORS } from "../constants/Theme";
import UsersSlider from "../components/common/blogsScreen";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const USERS = [
	{ id: "1", name: "John Doe", postImage: "https://cdn.slipe.fun/posts/be87bd9f-6489-4cc9-853d-c011f0c80ebb.png", followers: 1.2, posts: 32 },
	{ id: "2", name: "Jane Smith", postImage: "https://cdn.slipe.fun/posts/2d62a6d0-d5b5-4981-8cf4-e0146a0a1458.png", followers: 2.5, posts: 45 },
	{ id: "3", name: "Alex Green", postImage: "https://cdn.slipe.fun/posts/6174e8d9-ed9e-4da6-889a-7b0d14deac20.png", followers: 0.8, posts: 15 },
	{ id: "4", name: "Sarah Blue", postImage: "https://cdn.slipe.fun/posts/b9b7e7a3-77b1-41d4-8191-7e2585ecaf83.png", followers: 5.1, posts: 102 },
];

const BlogsScreen = () => {
	const insets = useSafeAreaInsets();

	return (
		<View style={{ flex: 1, paddingTop: insets.top + 6, backgroundColor: COLORS.black }}>
			<UsersSlider users={USERS} />
		</View>
	);
};

export default BlogsScreen;
