import { StyleSheet } from "react-native";
import { COLORS, BORDER_RADIUS } from "../../../constants/theme";

export const styles = StyleSheet.create({
    tabBarContainer: {
        backgroundColor: COLORS.black,
        flexDirection: 'row',
        alignItems: 'center',
		paddingTop: 10,
    },
    tabItem: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    tabButton: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: BORDER_RADIUS.medium,
        width: "100%",
    },
	tabButtonText: {
		fontSize: 12,
		fontFamily: '600',
	}
});
