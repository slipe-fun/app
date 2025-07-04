import { Button } from "tamagui";
import Icon from "@components/ui/icon";
import * as Haptics from "expo-haptics";

const CaptureButton = () => {
	return (
		<Button onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)}>
			<Icon icon="circleArrow" />
		</Button>
	);
};

export default CaptureButton;
