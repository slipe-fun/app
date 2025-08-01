import Icon from "@components/ui/icon";
import { View, Text, Button, getVariableValue } from "tamagui";
import { useProfileStore } from "@stores/profileScreen";
import { useTranslation } from "react-i18next";

const ProfileInfoBlock = () => {
	const user = useProfileStore(state => state.user);
	const color = getVariableValue("$white", "color");
	const { t } = useTranslation();
	return (
		<View w='$full' br='$7' gap='$6.5' backgroundColor='$backgroundTransparent' p='$6.5'>
			<View w='$full' flexDirection='row' justifyContent='space-between' alignItems='center'>
				<View gap='$4'>
					<Text fz='$2' lh='$2' fw='$2' color='$secondaryText'>
						{t("profile.username")}
					</Text>
					<Text fz='$3' lh='$3' fw='$2' color='$color'>
						@{user?.username}
					</Text>
				</View>
				<Button
					pressStyle={{
						scale: 0.98,
						opacity: 0.9,
					}}
					unstyled
					br='$full'
					justifyContent='center'
					alignItems='center'
					w='$13'
					h='$13'
					backgroundColor='$innerBlock'
				>
					<Icon icon='clipboard' size={26} color={color} />
				</Button>
			</View>
			<View gap='$4'>
				<Text fz='$2' lh='$2' fw='$2' color='$secondaryText'>
					{t("profile.bio")}
				</Text>
				<Text fz='$3' lh='$3' fw='$2' color='$color'>
					{user?.description}
				</Text>
			</View>
		</View>
	);
};

export default ProfileInfoBlock;
