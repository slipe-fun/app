import FastImage from "react-native-fast-image";
import { Separator, Text, View, getVariableValue } from "tamagui";
import { useState } from "react";
import { Blurhash } from "react-native-blurhash";
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";
import { LinearGradient } from "tamagui/linear-gradient";
import { URLS } from "@constants/urls";
import Icon from "@components/ui/icon";
import GetNormalDate from "@lib/getNormalDate";

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

const ProfileAvatar = ({ user, averageColor }) => {
	const [loaded, setLoaded] = useState(false);
	const color = getVariableValue("$white", "color");
	const [layout, setLayout] = useState({ width: 0, height: 0 });
	const animatedImageStyles = useAnimatedStyle(() => {
		const opacity = withSpring(loaded ? 1 : 0, {
			mass: 0.3,
			damping: 16,
			stiffness: 120,
		});
		return {
			opacity,
		};
	});

	return (
		<View w='$full' aspectRatio='1/1' overflow='hidden' justifyContent="flex-end" position='relative'>
			<View onLayout={(e) => setLayout(e.nativeEvent.layout)} w="$full" position="relative" zIndex="$1">
				<LinearGradient w={layout.width} h={layout.height} position="absolute" start={[0.5, 0]} end={[0.5, 1]} colors={['transparent', `rgba(${averageColor}, 1)`]}/>
				<View gap="$5" w="$full" alignItems="center" pb="$3" ph="$6" pt="$6">
					<Text fz="$7" lh="$7" fw="$3">{user?.nickname}</Text>
					<View opacity={0.7} flexDirection="row" alignItems="center" gap="$5">
						<View flexDirection="row" alignItems="center" gap="$2">
							<Icon icon="profile" size={19} color={color} />
							<Text fz="$2" lh="$2" fw="$2" color="$white">{user?.subscribers}</Text>
						</View>
						<View br="$7" w="$0.5" h="$0.5" backgroundColor="$white"/>
						<View flexDirection="row" alignItems="center" gap="$2">
							<Icon icon="clock" size={19} color={color} />
							<Text fz="$2" lh="$2" fw="$2" color="$white">{GetNormalDate(user?.date)}</Text>
						</View>
					</View>
				</View>
			</View>
			<AnimatedFastImage
				style={[
					{
						width: "100%",
						height: "100%",
						position: "absolute",
						top: 0,
						left: 0,
					},
					animatedImageStyles,
				]}
				source={{
					uri: `${URLS.CDN_AVATARS_URL}${user?.avatar}`,
					priority: FastImage.priority.high,
				}}
				onLoad={() => setLoaded(true)}
			/>
			{!loaded && (
				<Blurhash
					style={{
						width: "100%",
						height: "100%",
						position: "absolute",
						top: 0,
						left: 0,
					}}
					decodeAsync
					blurhash="U48pu-}=rY-V=qJS5+%K[l$LV{VY?GNfEj%2"
				/>
			)}
		</View>
	);
};

export default ProfileAvatar;
