import { Platform, View } from "react-native";
import { COLORS } from "../constants/theme";
import UsersSlider from "../components/common/blogsScreen";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const USERS = [
	{
		id: "1",
		name: "John Doe",
		postImage: "https://cdn.slipe.fun/posts/be87bd9f-6489-4cc9-853d-c011f0c80ebb.png",
		avatar: require("../../assets/test/xbox.jpg"),
		date: "3 days ago",
		views: "12.56k",
	},
	{
		id: "2",
		name: "Jane Smith",
		postImage: "https://cdn.slipe.fun/posts/2d62a6d0-d5b5-4981-8cf4-e0146a0a1458.png",
		avatar: require("../../assets/test/xbox.jpg"),
		date: "1 day ago",
		views: "8.39k",
	},
	{
		id: "3",
		name: "Alex Green",
		postImage: "https://cdn.slipe.fun/posts/6174e8d9-ed9e-4da6-889a-7b0d14deac20.png",
		avatar: require("../../assets/test/xbox.jpg"),
		date: "6 days ago",
		views: "30.41k",
	},
	{
		id: "4",
		name: "Sarah Blue",
		postImage: "https://cdn.slipe.fun/posts/b9b7e7a3-77b1-41d4-8191-7e2585ecaf83.png",
		avatar: require("../../assets/test/xbox.jpg"),
		date: "4 days ago",
		views: "2.43k",
	},
];

const BlogsScreen = () => {
	const insets = useSafeAreaInsets();

	return (
		<View style={{ flex: 1, paddingTop: Platform.OS === "ios" ? insets.top - 4 : insets.top + 6, backgroundColor: COLORS.black }}>
			<UsersSlider users={USERS} />
		</View>
	);
};

export default BlogsScreen;
