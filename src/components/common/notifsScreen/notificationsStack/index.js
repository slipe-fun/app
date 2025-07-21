import { View, Text, YStack } from "tamagui";

const NotificationStack = () => {
    return (
        <YStack f={1} ph="$6">
          <YStack w='$full' gap="$6">
              {Array.from({ length: 4 }).map((_, index) => (
                <View w='$full' h='$12' br="$7" backgroundColor="$primary" key={index}/>
              ))}
          </YStack>
          <View mh="$7" opacity={0.7} f={1} w='$full' h='$4' borderBottomLeftRadius="$5" borderBottomRightRadius="$5" backgroundColor="$primary"/>
          <View mh="$10.5" opacity={0.4} f={1} w='$full' h='$2' borderBottomLeftRadius="$4" borderBottomRightRadius="$4" backgroundColor="$primary"/>
        </YStack>
    );
};

export default NotificationStack;
