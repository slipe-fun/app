import { useState, useEffect, useCallback, memo } from "react";
import { View, Image, Button } from "tamagui";
import * as Haptics from "expo-haptics";
import { useNavigation } from "@react-navigation/native";
import { getAverageColor } from "@somesoap/react-native-image-palette";
import Icon from "@components/ui/icon";
import useGetAlbumPhotos from "@hooks/useGetAlbumPhotos";
import toSafeFileUri from "@lib/toSafeFileUrl";

const PublishButton = () => {
	const photos = useGetAlbumPhotos();
	const navigation = useNavigation();
	const [color, setColor] = useState(null);

  useEffect(() => {
    getAverageColor(toSafeFileUri(photos[0]?.uri), { pixelSpacingAndroid: 7 })
      .then(setColor)
  }, [photos]);

	const rows = [];
	for (let i = 0; i < photos.length; i += 2) {
		rows.push(photos.slice(i, i + 2));
	}

	const handlePress = useCallback(() => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
		navigation.navigate("Publish", { screen: "Publish_capture" });
	}, []);

	return (
		<Button
			unstyled
			m='$3'
			w='$full'
			br='$7'
			animation='fast'
			backgroundColor='$transparent'
			overflow='hidden'
			pressStyle={{
				scale: 0.98,
				opacity: 0.9,
			}}
			onPress={handlePress}
		>
			<View
				position='absolute'
				top={0}
				left={0}
				right={0}
				bottom={0}
				aspectRatio='6/9'
				br='$7'
				zIndex='$2'
				borderWidth={1}
				borderColor='rgba(255, 255, 255, 0.2)'
			/>
			<View w='$full' justifyContent='center' aspectRatio='6/9' alignItems='center' position='relative'>
				{rows.map((row, rowIndex) => (
					<View key={rowIndex} flexDirection='row' f={1}>
						{row.map(photo => (
							<Image key={photo.id} source={{ uri: photo.uri }} f={1} objectFit='scale-down' />
						))}
					</View>
				))}
				<View f={1} backgroundColor={color} w='$19' h='$19' br='$full' position='absolute' justifyContent='center' alignItems='center'>
					<View
						position='absolute'
						top={0}
						left={0}
						right={0}
						bottom={0}
						br='$full'
						zIndex='$2'
						borderWidth={1}
						borderColor='rgba(255, 255, 255, 0.2)'
					/>
					<Icon icon='publish' size={44} color='white' />
				</View>
			</View>
		</Button>
	);
};

export default memo(PublishButton);
