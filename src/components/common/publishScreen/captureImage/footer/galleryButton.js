import { useState, useEffect } from "react";
import { Pressable, Image } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { GradientBorder } from "@components/ui/gradientBorder";
import { styles } from "../styles/captureImageStyles";

export const MediaGalleryButton = ({ onGalleryPress }) => {
	const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
	const [photo, setPhoto] = useState(null);

	useEffect(() => {
		if (permissionResponse?.status === MediaLibrary.PermissionStatus.UNDETERMINED) {
			requestPermission();
		}
	}, [permissionResponse?.status, requestPermission]);

	useEffect(() => {
		const loadPhotos = async () => {
			if (permissionResponse?.granted) {
				try {
					const media = await MediaLibrary.getAssetsAsync({
						mediaType: [MediaLibrary.MediaType.photo],
						first: 1,
						sortBy: [[MediaLibrary.SortBy.creationTime, false]],
					});
					setPhoto(media.assets[0] ?? null);
				} catch (error) {
					console.error("Failed to load photos:", error);
					setPhoto(null);
				}
			} else {
				setPhoto(null);
			}
		};
		loadPhotos();
	}, [permissionResponse?.granted]);

	return (
		<Pressable onPress={onGalleryPress} disabled={!photo}>
			<GradientBorder borderRadius={32} borderWidth={1}>
				<Image source={{ uri: photo?.uri }} style={styles.menuButton} resizeMode='cover' />
			</GradientBorder>
		</Pressable>
	);
};
