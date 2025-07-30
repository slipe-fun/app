import { YStack } from "tamagui";
import ProfileAvatar from "./avatar";
import ProfileUserInfo from "./userInfo";
import ProfileActions from "./actions"; 
import ProfileBanner from "./banner";

const ProfileBlock = ({scrollY}) => {
    return (
        <YStack w="$full" alignItems="center" gap="$6">
            <ProfileBanner scrollY={scrollY}/>
            <ProfileAvatar scrollY={scrollY}/>
            <ProfileUserInfo scrollY={scrollY}/>  
            <ProfileActions />
        </YStack>
    )
}

export default ProfileBlock