import { Platform, View } from "react-native";
import { COLORS } from "../constants/theme";
import VerticalSlider from "../components/ui/verticalSlider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useFetchUsers from "@hooks/useFetchUsers";
import { useState, useEffect } from "react";

const BlogsScreen = () => {
	const insets = useSafeAreaInsets();

	const { users, handleFetchUsers } = useFetchUsers();

	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		if (currentSlide === users.length - 2) handleFetchUsers();
	}, [currentSlide, users, handleFetchUsers]);

	return (
		<View style={{ flex: 1, paddingTop: Platform.OS === "ios" ? insets.top - 2 : insets.top + 6, backgroundColor: COLORS.black }}>
			<VerticalSlider onSlideChange={setCurrentSlide} users={users} />
		</View>
	);
};

export default BlogsScreen;