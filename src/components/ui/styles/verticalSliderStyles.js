import { StyleSheet } from "react-native";
import { BORDER_RADIUS } from "@constants/theme";

const styles = StyleSheet.create({
	outerContainer: {
		width: "100%",
		overflow: "hidden",
		borderRadius: 20,
		height: "100%",
	},
	animatedContainer: {
		width: "100%",
	},
	pageContainer: {
		width: "100%",
		borderRadius: BORDER_RADIUS.medium,
		overflow: "hidden",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default styles;
