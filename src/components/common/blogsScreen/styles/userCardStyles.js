import { StyleSheet } from "react-native";
import { BORDER_RADIUS, COLORS, FONT_SIZE, SPACING } from "../../../../constants/theme";

const styles = StyleSheet.create({
	userCard: {
		height: "100%",
		borderRadius: BORDER_RADIUS.medium,
		overflow: "hidden",
		position: "relative",
		width: "100%",
		backgroundColor: COLORS.background,
	},
	cardContainer: {
		width: "100%",
		display: "flex",
		justifyContent: "space-between",
		height: "100%",
	},
	postImage: {
		height: "100%",
		position: "absolute",
		width: "100%",
	},
	header: {
		zIndex: 10,
		position: "relative",
		gap: SPACING.medium,
		width: "100%",
	},
	headerBlock: {
		justifyContent: "space-between",
		display: "flex",
		width: "100%",
		flexDirection: "row",
		paddingTop: 0,
		padding: SPACING.large,
	},
	headerAvatar: {
		width: 40,
		height: 40,
		borderRadius: 30,
	},
	headerInfo: {
		flexDirection: "column",
		gap: 2,
		justifyContent: "center",
		alignItems: "center",
	},
	infoName: {
		color: COLORS.white,
		fontFamily: "600",
		fontSize: 13,
	},
	infoDescription: {
		color: COLORS.transparentText,
		fontFamily: "500",
		fontSize: FONT_SIZE.xs,
	},
	gradient: {
		left: 0,
		position: "absolute",
		width: "100%",
		height: "100%",
	},
	// Indicator styles
	container: {
		gap: 6,
		padding: 18,
		paddingBottom: 0,
		flexDirection: "row",
	},
	indicator: {
		height: 2,
		flex: 1,
		backgroundColor: COLORS.indicator,
		borderRadius: 3,
	},
	indicatorInner: {
		height: "100%",
		borderRadius: 2,
		backgroundColor: COLORS.white,
	},
	// -----------------
	menuButton: {
		width: 40,
		height: 40,
		display: "flex",
		justifyContent: "center",
		overflow: "hidden",
		alignItems: "center",
		borderRadius: 30,
	},
	actions: {
		zIndex: 10,
		width: "100%",
		flexDirection: "row",
	},
	reactionButton: {
		width: "auto",
		paddingHorizontal: SPACING.large,
		gap: SPACING.small,
		flexDirection: "row",
		height: 40,
		display: "flex",
		overflow: "hidden",
		alignItems: "center",
		borderRadius: 30,
	},
	reactionButtonText: {
		fontFamily: "600",
		fontSize: 13,
		color: COLORS.white,
	},
	buttonsView: {
		flex: 1,
		zIndex: 10,
		flexDirection: "row",
	},
	buttonsViewButton: {
		flex: 1,
	},
	scrollView: {
		gap: SPACING.large,
		padding: SPACING.large,
	},
});

export default styles;
