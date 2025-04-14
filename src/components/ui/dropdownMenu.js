import Animated, { Keyframe } from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { GradientBorder } from "./gradientBorder";

const enteringAnimation = new Keyframe({
	0: {
		opacity: 0,
		transform: [{ translateY: 54 }, { scale: 0.94 }],
	},
	100: {
		opacity: 1,
		transform: [{ translateY: 60 }, { scale: 1 }],
	},
}).duration(150);

const exitingAnimation = new Keyframe({
	0: {
		opacity: 1,
		transform: [{ translateY: 60 }, { scale: 1 }],
	},
	100: {
		opacity: 0,
		transform: [{ translateY: 54 }, { scale: 0.94 }],
	},
}).duration(150);

const DropdownMenu = ({ setOpen, children }) => {
	return (
		<Animated.View
			style={{ width: 186, height: 290, transformOrigin: "rightTop", position: "absolute", right: 16 }}
			entering={enteringAnimation}
			exiting={exitingAnimation}
			onStartShouldSetResponder={() => true}
		>
			<GradientBorder BORDER_RADIUS={18} borderWidth={1}>
				<BlurView
					experimentalBlurMethod='dimezisBlurView'
					style={{ width: "100%", height: "100%" }}
					blurReductionFactor={4}
					tint='systemChromeMaterialDark'
					intensity={100}
				>
					{children}
				</BlurView>
			</GradientBorder>
		</Animated.View>
	);
};

export default DropdownMenu;
