import { Platform, View } from "react-native";
import { COLORS } from "../constants/theme";
import VerticalSlider from "../components/ui/verticalSlider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import UserCard from "../components/common/blogsScreen/userCard";

const USERS = [
	{
		name: "John Doe",
		avatar: require("../../assets/test/xbox.jpg"),
		posts: [
			{
				date: "1 hour ago",
				views: "82.82k",
				postImage: "https://cdn.slipe.fun/posts/2d62a6d0-d5b5-4981-8cf4-e0146a0a1458.png",
			},
			{
				date: "6 hours ago",
				views: "56.19k",
				postImage: "https://cdn.slipe.fun/posts/2d62a6d0-d5b5-4981-8cf4-e0146a0a1458.png",
			},
			{
				date: "1 day ago",
				views: "90.10k",
				postImage: "https://cdn.slipe.fun/posts/2d62a6d0-d5b5-4981-8cf4-e0146a0a1458.png",
			},
			{
				date: "1 day ago",
				views: "120.04k",
				postImage: "https://cdn.slipe.fun/posts/2d62a6d0-d5b5-4981-8cf4-e0146a0a1458.png",
			},
		],
	},
	{
		name: "User 2025",
		avatar: require("../../assets/test/opm.png"),
		posts: [
			{
				date: "1 day ago",
				views: "1.78k",
				postImage: "https://cdn.slipe.fun/posts/2d62a6d0-d5b5-4981-8cf4-e0146a0a1458.png",
			},
			{
				date: "2 days ago",
				views: "9.09k",
				postImage: "https://cdn.slipe.fun/posts/2d62a6d0-d5b5-4981-8cf4-e0146a0a1458.png",
			},
			{
				date: "5 days ago",
				views: "22.55k",
				postImage: "https://cdn.slipe.fun/posts/2d62a6d0-d5b5-4981-8cf4-e0146a0a1458.png",
			},
		],
	},
	{
		name: "Jakie Anderson",
		avatar: require("../../assets/test/slipe.png"),
		posts: [
			{
				date: "15 hours ago",
				views: "2.02k",
				postImage: "https://cdn.slipe.fun/posts/2d62a6d0-d5b5-4981-8cf4-e0146a0a1458.png",
			},
			{
				date: "1 day ago",
				views: "904",
				postImage: "https://cdn.slipe.fun/posts/2d62a6d0-d5b5-4981-8cf4-e0146a0a1458.png",
			},
			{
				date: "1 day ago",
				views: "1.44k",
				postImage: "https://cdn.slipe.fun/posts/2d62a6d0-d5b5-4981-8cf4-e0146a0a1458.png",
			},
			{
				date: "2 days ago",
				views: "3.94k",
				postImage: "https://cdn.slipe.fun/posts/2d62a6d0-d5b5-4981-8cf4-e0146a0a1458.png",
			},
			{
				date: "4 days ago",
				views: "18.09k",
				postImage: "https://cdn.slipe.fun/posts/2d62a6d0-d5b5-4981-8cf4-e0146a0a1458.png",
			},
		],
	},
	{
		name: "Eddie",
		avatar: require("../../assets/test/yo.jpg"),
		posts: [
			{
				date: "1 day ago",
				views: "8.39k",
				postImage: "https://cdn.slipe.fun/posts/2d62a6d0-d5b5-4981-8cf4-e0146a0a1458.png",
			},
			{
				date: "3 days ago",
				views: "12.23k",
				postImage: "https://cdn.slipe.fun/posts/2d62a6d0-d5b5-4981-8cf4-e0146a0a1458.png",
			},
		],
	},
];

const BlogsScreen = () => {
	const insets = useSafeAreaInsets();

	return (
		<View style={{ flex: 1, paddingTop: Platform.OS === "ios" ? insets.top - 2 : insets.top + 6, backgroundColor: COLORS.black }}>
			<VerticalSlider users={USERS} RenderSlideComponent={({ user, active }) => <UserCard user={user} active={active} />} />
		</View>
	);
};

export default BlogsScreen;
