import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { forwardRef, useMemo } from "react";
import { styles } from "./styles/gradientBorderStyles";

export const GradientBorder = forwardRef(({
	children,
	style,
	borderWidth = 1,
	borderRadius = 10,
	gradientColors = ["rgba(255, 255, 255, 0.18)", "rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.18)"],
	gradientStart = { x: 0, y: 0 },
	gradientEnd = { x: 1, y: 1 },
}, ref) => {
	const maskStyles = useMemo(
		() =>
			StyleSheet.create({
				maskElementContainer: {
					flex: 1,
					borderWidth: 1,
					borderRadius,
				},
			}),
		[borderRadius, borderWidth]
	);

	const containerStyle = useMemo(() => [styles.containerBase, { borderRadius }, style], [borderRadius, style]);

	return (
		<View ref={ref} style={containerStyle}>
			{children}
			<MaskedView style={styles.absoluteFill} maskElement={<View style={maskStyles.maskElementContainer} />}>
				<LinearGradient colors={gradientColors} start={gradientStart} end={gradientEnd} style={styles.absoluteFill} />
			</MaskedView>
		</View>
	);
});
