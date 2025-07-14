import { Button, View, Text, Image } from "tamagui";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { memo } from "react";
import { LinearGradient } from "expo-linear-gradient";

const Category = ({ category }) => {
	const navigation = useNavigation();

	return (
		<Button
			unstyled
			flex={1}
			alignItems='stretch'
			p='$0'
			overflow='hidden'
			br='$7'
			position='relative'
			backgroundColor='$backgroundTransparent'
			pressStyle={{
				scale: 0.98,
				opacity: 0.9,
			}}
			onPress={() => {
				Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
				navigation.navigate("Category_Page", { category });
			}}
		>
      <LinearGradient start={[0, 0]} end={[1, 1]} style={{ width: '100%', height: '100%', position: 'absolute', opacity: 0.4}} colors={[category.color, `#00000000`]}/>
			<View alignSelf='stretch' w='$full' p='$5'>
				<View br='$full' p='$3' backgroundColor={`${category.color}52`} w='$12' h='$12' alignItems='center' justifyContent='center'>
					<Image
            resizeMethod="resize"
						source={category.thumbnail}
						style={{
							width: "100%",
							height: "100%",
						}}
					/>
				</View>
			</View>
			<View alignSelf='stretch' w='$full' p='$6'>
				<Text textAlign='start' fz='$4' lh='$4' fw='$3' color={category.color}>
					{category.name}
				</Text>
			</View>
		</Button>
	);
};

export default memo(Category);
