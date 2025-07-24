import { useRef, useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import MediaPreview from '@components/ui/mediaPreview';
import FastImage from 'react-native-fast-image';
import { View } from 'tamagui';

const { width } = Dimensions.get('window');

const viewabilityConfig = {
    itemVisiblePercentThreshold: 80,
};

const CardSlider = ({ posts, setDuration, setIdx, idx }) => {
  const listRef = useRef(null);

  const handleLoadVideo = (meta, index) => {
    const duration = meta.duration || 5.5;
    setDuration(duration > 0 ? duration : 5.5);
  };

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems?.length > 0) {
      const firstVisible = viewableItems[0];
      if (firstVisible.index !== null && firstVisible.index !== undefined) {
        setIdx(firstVisible.index);
      }
    }
  }; 

  const renderItem = ({ item, index }) => (
    <View h="$full" w={width}>
      <MediaPreview
        media={item?.image}
        blurhash={item?.blurhash}
        priority={FastImage.priority.high}
        isVideoEnable
        active={index === idx}
        videoOnLoad={handleLoadVideo}
      />
    </View>
  );

  useEffect(() => {
    if (listRef.current && typeof idx === 'number') {
      listRef.current.scrollToIndex({ index: idx, animated: true });
    }
  }, [idx]);

  return (
    <FlashList
      ref={listRef}
      data={posts}
      horizontal
      style={StyleSheet.absoluteFill}
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      estimatedItemSize={width}
      overScrollMode='never'
      initialNumToRender={3}
      maxToRenderPerBatch={2}
      renderItem={renderItem}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      initialScrollIndex={idx}
      getItemType={() => 'slide'}
      keyExtractor={(_, index) => index.toString()}
    />
  );
};

export default CardSlider;
