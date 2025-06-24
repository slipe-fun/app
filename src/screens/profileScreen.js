import { View } from "tamagui";
import useFetchUser from "../hooks/useFetchUser";
import UserBlock from "@components/common/profileScreen/userBlock";
import ProfileInfoBlock from "@components/common/profileScreen/infoBlock";

const ProfileScreen = () => {
	const { user, isLoading, error } = useFetchUser();

	return (
		<View flex={1} backgroundColor="$bg">
			<UserBlock
				user={user}
			/>
			<View p="$6">
				<ProfileInfoBlock user={user}/>
			</View>
		</View>
	);
};

export default ProfileScreen;
