import { View } from "tamagui";
import ProfileAvatar from "./avatar";
import { Blurhash } from "react-native-blurhash";
import ProfileActions from "./actions";

const UserBlock = ({ user }) => {
	const color = Blurhash.getAverageColor('U2HetX9Fn%-pxuj@WBWB00_4xuM{-;?c?b%M');
    const averageColor = `${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)}`

	return (
		<View w='$full' borderBottomLeftRadius='$7' borderBottomRightRadius='$7' overflow='hidden'>
			<ProfileAvatar
				averageColor={averageColor}
				user={user}
			/>
			<ProfileActions averageColor={averageColor} />
		</View>
	);
};

export default UserBlock;
