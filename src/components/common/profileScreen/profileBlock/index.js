import { YStack } from "tamagui";
import ProfileAvatar from "./avatar";
import ProfileUserInfo from "./userInfo";
import ProfileActions from "./actions"; 

const ProfileBlock = ({scrollY}) => {
    return (
        <YStack w="$full" alignItems="center" gap="$6">
            <ProfileAvatar scrollY={scrollY}/>
            <ProfileUserInfo/>  
            <ProfileActions/>
        </YStack>
    )
}

export default ProfileBlock