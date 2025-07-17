import { Platform, View } from "react-native";
import { COLORS } from "../constants/theme";
import VerticalSlider from "../components/ui/verticalSlider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useFetchUsers from "@hooks/useFetchUsers";
import { useState, useEffect } from "react";
import addView from "@lib/addView";

const BlogsScreen = () => {
	const insets = useSafeAreaInsets();

	const { users, handleFetchUsers } = useFetchUsers();

	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		if (currentSlide === users.length - 2) handleFetchUsers();
	}, [currentSlide, users, handleFetchUsers]);

	useEffect(() => {
		const currentAuthor = users[currentSlide];
		const firstPost = currentAuthor?.posts[0];
		if (!firstPost?.viewed) addView(firstPost?.id)
	}, [currentSlide])

	return (
		<View style={{ flex: 1, paddingTop: Platform.OS === "ios" ? insets.top - 2 : insets.top + 6, backgroundColor: COLORS.black }}>
			<VerticalSlider onSlideChange={setCurrentSlide} users={users} />
		</View>
	); 
};

export default BlogsScreen;