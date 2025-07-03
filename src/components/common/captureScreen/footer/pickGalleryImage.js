const { default: useGetAlbumPhotos } = require("@hooks/useGetAlbumPhotos");
const { Button, Image } = require("tamagui");

const CapturePickGalleryImage = () => {
	const photos = useGetAlbumPhotos(1);

	return (
		<Button
			pressStyle={{
				scale: 0.98,
				opacity: 0.9,
			}}
			animation='fast'
            backgroundColor="$transparent"
			unstyled
			br='$full'
			overflow='hidden'
			w='$13'
			h='$13'
		>
			<Image objectFit='scale-down' style={{ width: "100%", height: "100%" }} source={{ uri: photos[0]?.uri }} />
		</Button>
	);
};

export default CapturePickGalleryImage
