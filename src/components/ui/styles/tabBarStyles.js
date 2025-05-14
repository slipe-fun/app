import { StyleSheet } from "react-native";
import { COLORS, BORDER_RADIUS } from "../../../constants/theme";

export const styles = StyleSheet.create({
    tabBarContainer: {
        backgroundColor: COLORS.black,
        flexDirection: 'row',
        alignItems: 'center',
		paddingTop: 14,
    },
    tabItem: {
        flex: 1,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    tabButton: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    publishButton: {
        borderRadius: 10,
        height: 40,
        width: 62,
        alignItems: 'center',
        justifyContent: 'center'
    },
	tabButtonText: {
        color: COLORS.white,
		fontSize: 12,
		fontFamily: '600',
	}
});
