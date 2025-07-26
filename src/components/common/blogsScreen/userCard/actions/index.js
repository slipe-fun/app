import { View, ScrollView } from "tamagui";
import useEmojiState from "@hooks/useEmojiState";
import Reaction from "./reaction";
import * as Haptics from "expo-haptics";
import Icon from "@components/ui/icon";
import { GradientBorder } from "@components/ui/gradientBorder";

const UserCardActions = ({ post }) => {
  const { emojis, handleEmojiClick } = useEmojiState(post);

  // it's just shit, i will move all emojis to cdn soon
  const emojiImages = {
    "0_16": require("../../../../../../assets/emojis/0_16.png"),
    "0_29": require("../../../../../../assets/emojis/0_29.png"),
    "0_32": require("../../../../../../assets/emojis/0_32.png"),
    "0_39": require("../../../../../../assets/emojis/0_39.png"),
    "1_29": require("../../../../../../assets/emojis/1_29.png"),
    "1_35": require("../../../../../../assets/emojis/1_35.png"),
  };

  const handleEmojiClickButton = (reaction) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    handleEmojiClick(reaction);
  };

  return (
    <View>
      <ScrollView
        horizontal
        contentContainerStyle={{ gap: 16, padding: 16 }}
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}
      >
        <GradientBorder
          isButton
          h="$12"
          justifyContent="center"
          alignItems="center"
           backgroundColor="$glassButtonStatic"
          w="$12"
          br="$full"
          unstyled
        >
          <Icon icon="message" size={24} />
        </GradientBorder>
        <GradientBorder
          isButton
          h="$12"
          backgroundColor="$glassButtonStatic"
          justifyContent="center"
          alignItems="center"
          w="$12"
          br="$full"
          unstyled
        >
          <Icon icon="smile" size={24} />
        </GradientBorder>

        {Object.keys(emojis).map((reaction, index) => (
          <Reaction
            key={index}
            emojis={emojis}
            reaction={reaction}
            index={index}
            isActive={emojis[reaction]?.isActive}
            handleEmojiClick={(reaction) => handleEmojiClickButton(reaction)}
            emojiImages={emojiImages}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default UserCardActions;