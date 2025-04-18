import { StyleSheet } from "react-native";
import { BORDER_RADIUS, COLORS, SPACING } from "../../../../constants/theme";

export const styles = StyleSheet.create({
	inputCard: {
		flex: 1,
		borderRadius: BORDER_RADIUS.medium,
		overflow: 'hidden',
		position: "relative",
		justifyContent: "space-between",
	},
	cameraView: {
		flex: 1,
		overflow: 'hidden'
	},
	inputCardHeader: {
		zIndex: 2,
		width: "100%",
		position: "absolute",
	},
	gradient: {
		left: 0,
		position: "absolute",
		width: "100%",
		height: "100%",
	},
	inputCardHeaderBlock: {
		width: "100%",
		padding: SPACING.large,
		justifyContent: "space-between",
		flexDirection: "row",
	},
	bigIconWrapper: {
		width: 36,
		height: 36,
		justifyContent: "center",
		alignItems: "center",
	},
	inputCardFooter: {
		zIndex: 2,
		width: "100%",
		position: "absolute",
		bottom: 0,
	},
	inputCardFooterBlock: {
		width: "100%",
		padding: SPACING.xxl,
		gap: 5,
	},
	footerBlockTitle: {
		fontFamily: "600",
		color: COLORS.white,
		fontSize: 20,
	},
	footerBlockSubtitle: {
		fontFamily: "500",
		color: COLORS.transparentText,
		fontSize: 16,
	},
	permissionWrapper: {
		flex: 1,
		zIndex: 10,
		padding: SPACING.large,
		justifyContent: "center",
		alignItems: "center",
	},
	permissionMessage: {
		color: COLORS.white,
		fontFamily: "600",
		fontSize: 20,
		textAlign: "center",
	},
	permissionContainer: {
		flex: 1,
	},
	galleryContainer: {
		display: 'flex',
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: SPACING.xs
	},
	galleryRow: {
		flex: 1,
		gap: SPACING.xs
	},
	galleryImage: {
		width: '100%',
		aspectRatio: 1/1,
		borderRadius: BORDER_RADIUS.small
	}
});
