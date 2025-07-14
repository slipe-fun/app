import { View, Text, Image } from "react-native";
import styles from "../styles/userCardStyles";
import { LinearGradient } from "expo-linear-gradient";
import Indicators from "./indicators";
import { URLS } from "@constants/urls";
import TimePassedFromDate from "../../../../lib/time-from-date";
import ColorfullyView from "@components/ui/colorfullyView";
import Icon from "@components/ui/icon";

const UserCardHeader = ({
  user,
  post,
  activeIdx,
  handleIndicatorFinish,
  pages,
  page,
  pause,
  averageColor
}) => {
  return (
    <View style={styles.header}>
      <LinearGradient
        colors={["rgba(0, 0, 0, 0.32)", "rgba(0, 0, 0, 0)"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradient}
      />
      {/* <Indicators isPaused={pause} onFinish={() => handleIndicatorFinish()} pages={pages} page={page} currentIndex={activeIdx} /> */}
      <View style={styles.headerBlock}>
        <Image
          style={styles.headerAvatar}
          source={{
            uri:
              URLS.CDN_AVATARS_URL +
              (user?.avatar || "ce7592a9-074d-4c4b-a2bf-08c61abbada2.jpg"),
          }}
        />
        <View style={styles.headerInfo}>
          <Text style={styles.infoName}>
            {user?.nickname || `${user?.username}`}
          </Text>
          <Text style={styles.infoDescription}>
            {TimePassedFromDate(post?.date)} | {post?.views} views
          </Text>
        </View>
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
          <Icon icon="menu" size={24} />
        </ColorfullyView>
      </View>
    </View>
  );
};

export default UserCardHeader;
