import { StyleSheet } from "react-native";
import { BORDER_RADIUS, COLORS, SPACING } from "../../../../constants/theme";

export const styles = StyleSheet.create({
	captureImage: {
		flex: 1,
		borderRadius: BORDER_RADIUS.large,
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
		position: "absolute",
	},
    header: {
		width: "100%",
        flexDirection: 'row',
        padding: SPACING.large,
        gap: 16,
		position: "absolute",
	},
	footerBlock: {
		flex: 1,
		height: 72,
		justifyContent: "center",
		alignItems: "center",
	},
	captureButton: {
		borderWidth: 4,
		width: 72,
		height: 72,
		borderRadius: 99,
		borderColor: COLORS.white,
		padding: SPACING.small,
	},
	captureButtonInside: {
		flex: 1,
		borderRadius: 99,
		backgroundColor: COLORS.white,
	},
	gradient: {
		left: 0,
		position: "absolute",
		width: "100%",
		height: "100%",
	},
    footerWrapper: {
		padding: SPACING.large,
		width: "100%",
		flexDirection: "row",
	},
    qualityWrapper: {
        flex: 1,
        alignItems: 'center',
    }
});
