import { View, Text, ButtonIcon } from "tamagui"
import { Platform } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Icon from "../../../ui/icon";

export const NotifsHeader = () => {
	const insets = useSafeAreaInsets();

	return (
		<View pt={Platform.OS === "ios" ? insets.top : insets.top + 10} width="100%" pb="$6" ph="$6">
			<Text 
				fz="$8" 
				fw="$3" 
				lh="$8" 
				color="$white"
			>
				Уведомления
			</Text>
            <View>
            </View>
		</View>
	);
};