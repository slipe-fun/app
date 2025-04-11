import { StyleSheet } from "react-native";
import { colors, spacing, borderRadius } from "../../../../constants/Theme";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: '100%',
		position: "relative",
		width: '100%',
	},
	pagerView: {
        display: 'flex',
        gap: 32,
		height: '90%',
		width: '100%',
        overflow: 'hidden',
        borderRadius: borderRadius.medium,
	},
	pageContainer: {
        height: '100%', 
        width: '100%',
		borderRadius: borderRadius.medium,
		overflow: "hidden",
	},
});

export default styles;
