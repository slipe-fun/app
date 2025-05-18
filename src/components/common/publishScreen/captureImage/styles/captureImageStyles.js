import { StyleSheet } from "react-native";
import { BORDER_RADIUS, COLORS, SPACING } from "../../../../../constants/theme";

export const styles = StyleSheet.create({
	captureImage: {
		flex: 1,
		borderRadius: BORDER_RADIUS.medium,
		overflow: "hidden",
		position: "relative",
		justifyContent: "space-between",
	},
	cameraView: {
		flex: 1,
		overflow: "hidden",
	},
	menuButton: {
		width: 44,
		height: 44,
		display: "flex",
		justifyContent: "center",
		overflow: "hidden",
		alignItems: "center",
		borderRadius: 30,
	},
	footer: {
		width: "100%",
        bottom: 0,
		zIndex: 20,
		paddingHorizontal: SPACING.large,
		paddingVertical: SPACING.xxxl,
		flexDirection: 'row',
		position: "absolute",
	},
    header: {
		width: "100%",
        flexDirection: 'row',
		zIndex: 20,
        padding: SPACING.large,
		justifyContent: 'flex-end',
        gap: 16,
		position: "absolute",
	},
	footerBlock: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	captureButton: {
		borderWidth: 4,
		width: 68,
		height: 68,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 99,
		borderColor: COLORS.white,
	},
	captureButtonInside: {
		width: '100%',
		height: '100%',
	},
    qualityWrapper: {
        flex: 1,
        alignItems: 'center',
    },
	cameraLoader: {
		width: '100%',
		height: '100%',
		position: 'absolute',
	},
	zoomDetector: {
		width: '100%',
		height: '100%',
		position: 'absolute',
		zIndex: 10,
	},
	confirmFooter: {
		width: "100%",
        bottom: 0,
		zIndex: 20,
		paddingHorizontal: 42,
		paddingVertical: 32,
		justifyContent: 'space-between',
		flexDirection: 'row',
		position: "absolute",
	},
	confirmButton: {
		width: 52,
		height: 52,
		display: "flex",
		justifyContent: "center",
		overflow: "hidden",
		alignItems: "center",
		borderRadius: 30,
	}
});
