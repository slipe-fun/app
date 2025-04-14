import { View, Image, Pressable } from "react-native";
import { GradientBorder } from "../../../ui/gradientBorder";
import styles from "../styles/userCardStyles";
import UserCardHeader from "./user";
import UserCardActions from "./actions";
import { useState, useCallback, useMemo } from "react"; // Добавлен useMemo

const UserCard = ({ user, active }) => {
    const [idx, setIdx] = useState(0);
    const posts = useMemo(() => user?.posts || [], [user?.posts]);
    const postsLength = useMemo(() => posts.length, [posts]);
    const post = useMemo(() => posts[idx], [posts, idx]);

    const goToNext = useCallback(() => {
        setIdx(prevIndex => {
            const nextIndex = prevIndex + 1;
            return nextIndex < postsLength ? nextIndex : prevIndex;
        });
    }, [postsLength]);

    const goToPrevious = useCallback(() => {
        setIdx(prevIndex => {
            const prevInternalIndex = prevIndex - 1;
            return prevInternalIndex >= 0 ? prevInternalIndex : 0;
        });
    }, []);

    const handleIndicatorFinish = useCallback(() => {
        if (idx < postsLength - 1) {
            setIdx(prev => prev + 1);
        } else {
        }
    }, [idx, postsLength])

    return (
        <GradientBorder
            style={styles.cardContainer}
            borderRadius={16}
            gradientColors={["rgba(255, 255, 255, 0.24)", "rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.24)"]}
            borderWidth={1}
        >
            <Image source={{ uri: post?.postImage }} style={styles.postImage} />

            <UserCardHeader
                pause={active}
                handleIndicatorFinish={handleIndicatorFinish}
                activeIdx={idx}
                total={postsLength}
                post={post}
                user={user}
            />

            {postsLength > 1 && (
                <View style={styles.buttonsView}>
                    <Pressable style={styles.buttonsViewButton} onPress={goToPrevious} />
                    <Pressable style={styles.buttonsViewButton} onPress={goToNext} />
                </View>
            )}

            <UserCardActions />
        </GradientBorder>
    );
};

export default UserCard;