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
        height: 44,
        justifyContent: "center",
        alignItems: "center",
    },
    tabButton: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: BORDER_RADIUS.medium,
        width: "100%",
    },
    publishButton: {
        borderRadius: 10,
        height: 44,
        width: 68,
        alignItems: 'center',
        justifyContent: 'center'
    },
	tabButtonText: {
        color: COLORS.white,
		fontSize: 12,
		fontFamily: '600',
	}
});
