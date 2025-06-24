import Icon from "@components/ui/icon";
import { View, Text, Button, getVariableValue } from "tamagui";
import * as Haptics from "expo-haptics";

const ProfileInfoBlock = ({ user }) => {
	const color = getVariableValue("$white", "color");
	return (
		<View w='$full' br='$7' gap='$6.5' backgroundColor='$backgroundTransparent' p='$6.5'>
			<View w='$full' flexDirection='row' justifyContent="space-between" alignItems="center">
				<View gap='$4'>
					<Text fz='$2' lh='$2' color='$secondaryText'>
						Имя пользователя
					</Text>
					<Text fz='$2' lh='$2' fw='$3' color='$color'>
						@{user?.username}
					</Text>
				</View>
				<Button
					pressStyle={{
						scale: 0.98,
						opacity: 0.9,
					}}
					onPress={() => {
						Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
					}}
					animation='fast'
					unstyled
					br='$full'
                    justifyContent="center"
                    alignItems="center"
					w='$12'
					h='$12'
					backgroundColor='$innerBlock'
				>
					<Icon icon='qrcode' size={24} color={color} />
				</Button>
			</View>
			<View gap='$4'>
				<Text fz='$2' lh='$2' color='$secondaryText'>
					Обо мне
				</Text>
				<Text fz='$2' lh='$2' fw='$3' color='$color'>
					{user?.description}
				</Text>
			</View>
		</View>
	);
};

export default ProfileInfoBlock;
