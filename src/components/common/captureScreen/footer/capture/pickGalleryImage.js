import useGetAlbumPhotos from "@hooks/ui/useGetAlbumPhotos";
import { Button, Image, View } from "tamagui";
import * as Haptics from "expo-haptics";

const CapturePickGalleryImage = () => {
	const photos = useGetAlbumPhotos(1);

	const handlePress = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
	}

	return (
		<Button
		onPress={handlePress}
			pressStyle={{
				scale: 0.95,
				opacity: 0.9,
			}}
			backgroundColor='$transparent'
			unstyled
			br='$full'
			overflow='hidden'
			w='$13'
			h='$13'
		>
			<View position='absolute' top={0} left={0} right={0} bottom={0} br='$full' zIndex='$2' borderWidth={1} borderColor='rgba(255, 255, 255, 0.2)' />
			<Image objectFit='scale-down' style={{ width: "100%", height: "100%" }} source={{ uri: photos[0]?.uri }} />
		</Button>
	);
};

export default CapturePickGalleryImage;
