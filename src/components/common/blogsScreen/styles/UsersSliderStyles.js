import { StyleSheet } from "react-native";
import { borderRadius } from "../../../../constants/Theme";

const styles = StyleSheet.create({
	outerContainer: {
		width: "100%",
		overflow: "hidden",
		borderRadius: BORDERRADIUS.medium,
		height: "100%",
	},
	animatedContainer: {
		width: "100%",
	},
	pageContainer: {
		width: "100%",
		borderRadius: BORDERRADIUS.medium,
		overflow: "hidden",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default styles;
