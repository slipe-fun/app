import { View, ScrollView } from "tamagui";
import useEmojiState from "@hooks/useEmojiState";
import ColorfullyView from "@components/ui/colorfullyView";
import Reaction from "./reaction";
import * as Haptics from "expo-haptics";
import Icon from "@components/ui/icon";

const UserCardActions = ({ post, averageColor }) => {
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
        contentContainerStyle={{ gap: 16, padding: 18 }}
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}
      >
        <ColorfullyView
          isButton
          h="$12"
          justifyContent="center"
          alignItems="center"
          w="$12"
          br="$full"
          color={`rgb(${averageColor})`}
          unstyled
        >
          <Icon icon="message" size={24} />
        </ColorfullyView>
        <ColorfullyView
          isButton
          h="$12"
          justifyContent="center"
          alignItems="center"
          w="$12"
          br="$full"
          color={`rgb(${averageColor})`}
          unstyled
        >
          <Icon icon="smile" size={24} />
        </ColorfullyView>

        {Object.keys(emojis).map((reaction, index) => (
          <Reaction
            key={index}
            emojis={emojis}
            reaction={reaction}
            index={index}
            isActive={emojis[reaction]?.isActive}
            handleEmojiClick={(reaction) => handleEmojiClickButton(reaction)}
            emojiImages={emojiImages}
            averageColor={averageColor}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default UserCardActions;
