import { StyleSheet } from "react-native";
import { borderRadius, colors, spacing } from "../../../../constants/Theme";

const styles = StyleSheet.create({
	userCard: {
		height: '100%', 
        borderRadius: borderRadius.medium,
		overflow: "hidden",
		width: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        backgroundColor: colors.background,
	},
    cardContainer: {
        width: '100%',
        height: '100%',
      },
	postImage: {
		height: '100%', 
		width: '100%',
	},
});

export default styles;
