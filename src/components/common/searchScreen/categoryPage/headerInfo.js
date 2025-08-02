import { LinearGradient } from "expo-linear-gradient";
import Icon from "@components/ui/icon";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { View, Text, YStack, XStack } from "tamagui";
import { useTranslation } from "react-i18next";

const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const CategoryPageHeaderInfo = ({ category, topNumber, postCount, opacityStyle, fontStyle }) => {
	const { t } = useTranslation();
	return (
		<YStack minHeight='$12' justifyContent='center' w='$full' gap='$4' p={category?.isSlides ? "$8" : "$6"} alignItems='center'>
			<AnimatedLinearGradient
				colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0)"]}
				start={{ x: 0.5, y: 1 }}
				end={{ x: 0.5, y: 0 }}
				style={[StyleSheet.absoluteFill, opacityStyle]}
			/>

			<AnimatedText w='$full' textAlign='center' fw='$3' fz='$7' lh='$7' color='$white' style={fontStyle}>
				{category?.isSlides ? category?.title : t(`categories.${category?.name}`)}
			</AnimatedText>

			{!category?.isSlides && (
				<XStack opacity={0.7} flexDirection='row' alignItems='center' gap='$5'>
					<View flexDirection='row' alignItems='center' gap='$2'>
						<Icon icon='crown' size={17} />
						<Text fz='$2' lh='$2' fw='$3' color='$white'>
							TOP {topNumber}
						</Text>
					</View>

					<View br='$7' w='$0.5' h='$0.5' backgroundColor='$white' />

					<View flexDirection='row' alignItems='center' gap='$2'>
						<Icon icon='rectangle.columns' size={17} />
						<Text fz='$2' lh='$2' fw='$2' color='$white'>
							{postCount}
						</Text>
					</View>
				</XStack>
			)}
		</YStack>
	);
};

export default CategoryPageHeaderInfo;
