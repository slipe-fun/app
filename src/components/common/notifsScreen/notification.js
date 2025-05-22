import { Avatar, Text, View } from "tamagui";

const Notification = ({notification}) => {
    return (
        <View>
            <Avatar src={notification.user.avatar} />
            <View>
                <Text></Text>
            </View>
        </View>
    )
}

export default Notification