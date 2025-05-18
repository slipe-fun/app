import { StyleSheet } from "react-native";
import { SPACING, COLORS, BORDER_RADIUS } from "../../../../../constants/theme";

export const mainStyles = StyleSheet.create({
    imageWrapper: {
		flex: 1,
		borderRadius: BORDER_RADIUS.medium,
		overflow: "hidden",
		position: "relative",
		justifyContent: "space-between",
	},
    container: {
        flex: 1,
        gap: SPACING.large,
        backgroundColor: COLORS.black,
    },
    image: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    }
})