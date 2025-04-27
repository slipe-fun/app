import { useState, useEffect } from "react";
import { api } from "../lib/api";

export function useEmojiState(post) {
    const [postReactions, setPostReactions] = useState([]);

    const defaultEmojis = {
        "0_16": {
            count: 0,
            isActive: false
        },
        "0_29": {
            count: 0,
            isActive: false
        },
        "0_32": {
            count: 0,
            isActive: false
        },
        "0_39": {
            count: 0,
            isActive: false
        },
        "1_29": {
            count: 0,
            isActive: false
        },
        "1_35": {
            count: 0,
            isActive: false
        }
    };

    useEffect(() => {
        if (!post?.id) return;

        const existingPost = postReactions.find(p => p.postId === post.id);
        if (existingPost) return;

        const postEmojis = {...defaultEmojis};

        if (post?.reactions?.length > 0) {
            post.reactions.forEach(reaction => {
                if (postEmojis[reaction.name]) {
                    postEmojis[reaction.name] = {
                        count: Number(reaction.count),
                        isActive: reaction.name === post.reaction?.name
                    };
                }
            });
        }

        setPostReactions(prev => [...prev, {
            postId: post.id,
            emojis: postEmojis
        }]);
    }, [post]);

    const handleEmojiClick = async (emoji) => {
        if (!post?.id) return;

        setPostReactions(prev => {
            return prev.map(p => {
                if (p.postId !== post.id) return p;

                const newEmojis = {};
                Object.keys(p.emojis).forEach(key => {
                    newEmojis[key] = {
                        count: key === emoji && p.emojis[key].isActive ? p.emojis[key].count - 1 :
                               key === emoji && !p.emojis[key].isActive ? p.emojis[key].count + 1 :
                               key !== emoji && p.emojis[key].isActive ? p.emojis[key].count - 1 : p.emojis[key].count,
                        isActive: false
                    };
                });
                if (!p.emojis[emoji].isActive) {
                    newEmojis[emoji].isActive = true;
                }

                return {
                    ...p,
                    emojis: newEmojis
                };
            });
        });

        const formData = new FormData();
        formData.append("to_post", post.id);
        formData.append("name", emoji);

        await api.media.post("/reaction/add", formData);
    };

    const currentPostEmojis = postReactions.find(p => p.postId === post?.id)?.emojis || defaultEmojis;

    return { emojis: currentPostEmojis, handleEmojiClick };
}