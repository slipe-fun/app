import React, { useState, useEffect } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as MediaLibrary from "expo-media-library";
import { GradientBorder } from "../../../ui/gradientBorder";
import { styles } from "../styles/inputCardsStyles";
import Icon from "../../../ui/icon";
import { COLORS } from "../../../../constants/theme";

export const GalleryInputCard = ({ result }) => {
	const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
	const [photos, setPhotos] = useState([]);

	useEffect(() => {
		const loadPhotos = async () => {
			if (permissionResponse?.granted) {
				const media = await MediaLibrary.getAssetsAsync({
					mediaType: [MediaLibrary.MediaType.photo],
					first: 9,
					sortBy: [[MediaLibrary.SortBy.creationTime, false]],
				});
				setPhotos(media.assets);
			} else {
				setPhotos([]);
			}
		};
		loadPhotos();
	}, [permissionResponse?.granted]);

	const chunkRows = (arr, chunkSize = 3) =>
		arr.reduce((rows, item, idx) => {
			const rowIndex = Math.floor(idx / chunkSize);
			if (!rows[rowIndex]) rows[rowIndex] = [];
			rows[rowIndex].push(item);
			return rows;
		}, []);

	return (
		<GradientBorder
			borderRadius={16}
			gradientColors={["rgba(255, 255, 255, 0.24)", "rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.24)"]}
			borderWidth={1}
			style={styles.inputCard}
		>
			{permissionResponse?.granted ? (
				<View style={styles.cameraView}>
					<View style={styles.galleryContainer}>
						{photos.length > 0 &&
							chunkRows(photos, 3).map((row, rowIdx) => (
								<View key={rowIdx} style={styles.galleryRow}>
									{row.map(photo => (
										<Image key={photo.id} source={{ uri: photo.uri }} style={styles.galleryImage} resizeMode='cover' />
									))}
								</View>
							))}
					</View>

					<View style={styles.inputCardHeader}>
						<LinearGradient
							colors={["rgba(0, 0, 0, 0.32)", "rgba(0, 0, 0, 0)"]}
							start={{ x: 0.5, y: 0 }}
							end={{ x: 0.5, y: 1 }}
							style={styles.gradient}
						/>
						<View style={styles.inputCardHeaderBlock}>
							<Icon icon='camera' size={36} color={COLORS.transparentIcon} />
							<View style={styles.bigIconWrapper}>
								<Icon icon='arrowRightUp' size={27} color={COLORS.transparentIcon} />
							</View>
						</View>
					</View>

					<View style={styles.inputCardFooter}>
						<LinearGradient
							colors={["rgba(0, 0, 0, 0.32)", "rgba(0, 0, 0, 0)"]}
							start={{ x: 0.5, y: 1 }}
							end={{ x: 0.5, y: 0 }}
							style={styles.gradient}
						/>
						<View style={styles.inputCardFooterBlock}>
							<Text style={styles.footerBlockTitle}>Via gallery</Text>
							<Text style={styles.footerBlockSubtitle}>Choose video/photo from gallery</Text>
						</View>
					</View>
				</View>
			) : (
				<View style={styles.permissionContainer}>
					<Pressable style={styles.permissionWrapper} onPress={requestPermission}>
						<Text style={styles.permissionMessage}>
							{permissionResponse?.canAskAgain === false
								? "Доступ к галерее запрещён. Включите его в настройках."
								: "Нужен доступ к галерее. Нажмите, чтобы разрешить."}
						</Text>
					</Pressable>
				</View>
			)}
		</GradientBorder>
	);
};
