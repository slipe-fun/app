import * as MediaLibrary from "expo-media-library";
import { useEffect, useState } from "react";

export default function useGetAlbumPhotos(count = 4) {
	const [photos, setPhotos] = useState([]);
	const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

	useEffect(() => {
		const loadPhotos = async () => {
			if (!permissionResponse?.granted) await requestPermission();

			let media;
			media = await MediaLibrary.getAssetsAsync({
				mediaType: [MediaLibrary.MediaType.photo],
				first: count,
				sortBy: [[MediaLibrary.SortBy.modificationTime, false]],
			});

			setPhotos(media.assets ?? []);
		};

		loadPhotos();
	}, [permissionResponse]);

	return photos;
}
