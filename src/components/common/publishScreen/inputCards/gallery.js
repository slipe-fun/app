import { GradientBorder } from "../../../ui/gradientBorder";
import { styles } from "../styles/inputCardsStyles";

export const GalleryInputCard = ({ result }) => {
	return (
		<GradientBorder
			style={styles.inputCard}
			borderRadius={16}
			gradientColors={["rgba(255, 255, 255, 0.24)", "rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.24)"]}
			borderWidth={1}
		></GradientBorder>
	);
};
