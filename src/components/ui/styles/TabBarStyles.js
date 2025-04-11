import { StyleSheet } from "react-native";
import { colors, spacing, borderRadius } from "../../../constants/Theme";

export const styles = StyleSheet.create({
    tabBarContainer: {
        backgroundColor: colors.black,
        flexDirection: 'row',
        alignItems: 'center',
		paddingTop: 10,
        justifyContent: 'space-around',
    },
    tabItem: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    tabButton: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: borderRadius.medium,
        width: "100%",
    },
	tabButtonText: {
		fontSize: 12,
		fontWeight: 600,
	}
});