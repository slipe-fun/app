import { View, getVariableValue, Text } from "tamagui";
import ProfileAvatar from "./avatar";
import { Blurhash } from "react-native-blurhash";
import ProfileActions from "./actions";
import Icon from "@components/ui/icon";
import { memo, useMemo, useState, useRef, useEffect } from "react";
import GetNormalDate from "@lib/getNormalDate";
import { Dimensions } from "react-native";
import { LinearGradient } from "tamagui/linear-gradient";

const { width } = Dimensions.get("window");
const iconColor = getVariableValue("$white", "color");

const UserInfo = memo(({ user }) => (
	<View gap='$5' w='$full' alignItems='center' pb='$3' ph='$6'>
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
));

const UserBlock = ({ user, scrollY }) => {
	const ref = useRef();
	const [viewHeight, setViewHeight] = useState(0);
	const averageColor = useMemo(() => {
		const color = Blurhash.getAverageColor(user?.avatar_information.blurhash);
		if (!color) return '0,0,0';
		return `${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)}`;
	}, [user?.avatar_information?.blurhash]);

	useEffect(() => {
		setViewHeight(ref.current?.getBoundingClientRect()?.height);
	}, []);

	return (
		<View backgroundColor={`rgba(${averageColor}, 1)`} w='$full' borderBottomLeftRadius='$7' borderBottomRightRadius='$7' overflow='hidden'>
			<View w='$full' overflow='hidden' justifyContent='flex-end' position='relative'>
				<View w={width} position='absolute' zIndex='$1' ref={ref}>
					<LinearGradient
						w={width}
						h={viewHeight}
						position='absolute'
						start={[0.5, 0]}
						end={[0.5, 1]}
						colors={[`rgba(${averageColor}, 0)`, `rgba(${averageColor}, 1)`]}
					/>
					<UserInfo user={user} />
				</View>
				<ProfileAvatar averageColor={averageColor} scrollY={scrollY} viewHeight={viewHeight} user={user} />
			</View>
			<ProfileActions scrollY={scrollY} averageColor={averageColor} />
		</View>
	);
};

export default memo(UserBlock);
