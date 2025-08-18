export default function (prev, post, emojis) {
    return [
        ...prev.map(_post =>
            _post.id === post.id
                ? {
                    ...post,
                    reactions: Object.keys(emojis).map(emoji => ({ name: emoji, count: emojis[emoji].count })),
                    reaction: Object.keys(emojis)?.find(emoji => emojis[emoji]?.isActive) || null
                }
                : _post
        )
    ].filter(Boolean)
}