import { GradientBorder } from "@components/ui/gradientBorder";
import Icon from "@components/ui/icon";
import { Button, Text, View, getVariableValue } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";
import { useState } from "react";
import * as Haptics from "expo-haptics";

const buttons = [
	{ icon: "edit", label: "Изм." },
	{ icon: "notifications", label: "Увед." },
	{ icon: "gear", label: "Настр." },
	{ icon: "menu", label: "Ещё" },
];

const ProfileActions = ({ averageColor }) => {
	const color = getVariableValue("$white", "color");
	const [layout, setLayout] = useState({ width: 0, height: 0 });
	const br = getVariableValue("$5", "radius");

	return (
		<View onLayout={e => setLayout(e.nativeEvent.layout)} w='$full' position='relative'>
			<LinearGradient
				w={layout.width}
				h={layout.height}
				position='absolute'
				start={[0.5, 0]}
				end={[0.5, 1]}
				colors={[`rgba(${averageColor}, 1)`, `rgba(${averageColor}, 0.7)`]}
			/>
			<View w='$full' ph='$6' pb='$6' flexDirection='row' pt='$3' gap='$3'>
				{buttons.map((button, index) => (
					<Button
						pressStyle={{
							scale: 0.98,
							opacity: 0.9,
						}}
						onPress={() => {
							Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
						}}
						animation='fast'
						key={index}
						backgroundColor='$glassButton'
						unstyled
						br='$5'
						f={1}
						position='relative'
					>
						<GradientBorder gap='$0.5' borderRadius={br} pt='$2' pb='$3' alignItems='center' style={{ width: "100%" }}>
							<Icon color={color} icon={button.icon} size={24} />
							<Text w='$full' lh='$0.75' fw='$2' fz='$0.75'>
								{button.label}
							</Text>
						</GradientBorder>
					</Button>
				))}
			</View>
		</View>
	);
};

export default ProfileActions;
