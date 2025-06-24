import { View, getVariableValue, Text } from "tamagui";
import ProfileAvatar from "./avatar";
import { Blurhash } from "react-native-blurhash";
import ProfileActions from "./actions";
import Icon from "@components/ui/icon";
import { useState } from "react";
import GetNormalDate from "@lib/getNormalDate";
import { LinearGradient } from "tamagui/linear-gradient";

const UserBlock = ({ user, scrollY }) => {
	const color = Blurhash.getAverageColor(user?.avatar_information.blurhash);
	const averageColor = `${Math.round(color?.r)}, ${Math.round(color?.g)}, ${Math.round(color?.b)}`;
    const iconColor = getVariableValue("$white", "color");
    const [layout, setLayout] = useState({ width: 0, height: 0 });

	return (
		<View w='$full' borderBottomLeftRadius='$7' borderBottomRightRadius='$7' overflow='hidden'>
			<View w='$full' aspectRatio='1/1' overflow='hidden' justifyContent='flex-end' position='relative'>
				<View onLayout={e => setLayout(e.nativeEvent.layout)} w='$full' position='relative' zIndex='$1'>
					<LinearGradient
						w={layout.width}
						h={layout.height}
						position='absolute'
						start={[0.5, 0]}
						end={[0.5, 1]}
						colors={["transparent", `rgba(${averageColor}, 1)`]}
					/>
					<View gap='$5' w='$full' alignItems='center' pb='$3' ph='$6' pt='$6'>
						<Text fz='$7' lh='$7' fw='$3'>
							{user?.nickname || user?.username}
						</Text>
						<View opacity={0.7} flexDirection='row' alignItems='center' gap='$5'>
							<View flexDirection='row' alignItems='center' gap='$2'>
								<Icon icon='profile' size={19} color={iconColor} />
								<Text fz='$2' lh='$2' fw='$2' color='$white'>
									{user?.subscribers}
								</Text>
							</View>
							<View br='$7' w='$0.5' h='$0.5' backgroundColor='$white' />
							<View flexDirection='row' alignItems='center' gap='$2'>
								<Icon icon='clock' size={19} color={iconColor} />
								<Text fz='$2' lh='$2' fw='$2' color='$white'>
									{GetNormalDate(user?.date)}
								</Text>
							</View>
						</View>
					</View>
				</View>
				<ProfileAvatar scrollY={scrollY} user={user} />
			</View>
			<ProfileActions averageColor={averageColor} />
		</View>
	);
};

export default UserBlock;
