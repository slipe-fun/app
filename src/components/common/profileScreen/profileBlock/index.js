import { YStack } from "tamagui";
import ProfileAvatar from "./avatar";
import ProfileUserInfo from "./userInfo";
import ProfileActions from "./actions"; 
import ProfileBanner from "./banner";

const ProfileBlock = ({scrollY, user, isScreen}) => {
    return (
        <YStack w="$full" alignItems="center" gap="$6">
            <ProfileBanner scrollY={scrollY} user={user}/>
            <ProfileAvatar scrollY={scrollY} user={user}/>
            <ProfileUserInfo scrollY={scrollY} user={user}/>  
            <ProfileActions isScreen={isScreen} user={user}/>
        </YStack>
    )
}

export default ProfileBlock