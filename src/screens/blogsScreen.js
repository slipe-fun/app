import VerticalSlider from "../components/ui/verticalSlider";
import useFetchUsers from "@hooks/useFetchUsers";
import { useState, useEffect } from "react";
import addView from "@lib/addView";
import useInsets from "@hooks/ui/useInsets";
import { View } from "tamagui";

const BlogsScreen = () => {
	const insets = useInsets();

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
		<View f={1} backgroundColor="$bg" pt={insets.top}>
			<VerticalSlider onSlideChange={setCurrentSlide} users={users} />
		</View>
	); 
};

export default BlogsScreen;