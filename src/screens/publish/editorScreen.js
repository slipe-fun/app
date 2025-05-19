import { View, Platform, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { GradientBorder } from "../../components/ui/gradientBorder";
import { selectImage } from "../../reducers/publishScreen";
import { mainStyles } from "../../components/common/publishScreen/editorScreen/styles/mainStyles";

const EditorScreen = () => {
	const insets = useSafeAreaInsets();
	const image = useSelector(selectImage);

	return (
		<View style={[mainStyles.container, { paddingTop: Platform.OS === "ios" ? insets.top - 4 : insets.top + 6 }]}>
			<GradientBorder
				style={mainStyles.imageWrapper}
				borderRadius={14}
				gradientColors={["rgba(255, 255, 255, 0.18)", "rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.18)"]}
				borderWidth={1}
			>
				<Image fadeDuration={175} source={{ uri: image }} style={mainStyles.image} />
			</GradientBorder>
		</View>
	);
};

export default EditorScreen;
