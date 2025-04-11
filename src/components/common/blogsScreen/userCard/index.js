import { View, Image, StyleSheet } from "react-native";
import { GradientBorder } from '../../../ui/GradientBorder';
import styles from '../styles/UserCardStyles';

const UserCard = ({ user, index }) => {
  return (
    <GradientBorder
      style={styles.cardContainer}
      borderRadius={16}
      borderWidth={1}
    >
      <Image
        source={{ uri: user.postImage }}
        style={styles.postImage}
      />
    </GradientBorder>
  );
};

export default UserCard;