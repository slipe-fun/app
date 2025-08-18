import { useState, useEffect } from "react";
import {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  interpolate,
  useAnimatedRef,
} from "react-native-reanimated";
import { normalSpring } from "@constants/easings";
import { categories } from "@constants/categories";
import * as Haptics from "expo-haptics";
import { getVariableValue } from "tamagui";

const EXPANDED_HEIGHT = categories.slice(1, 7).length * 43;
const MAX_ITEM_WIDTH = 180;
const buttonHeight = getVariableValue("$12", "size");

export default function useDropdownLogic(setActiveItem) {
  const [open, setOpen] = useState(false);
  const [buttonWidth, setButtonWidth] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const opened = useSharedValue(0);
  const buttonRef = useAnimatedRef(null);

  const toggleMenu = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    const newState = !open;
    setOpen(newState);
    opened.value = withSpring(newState ? 1 : 0, normalSpring);
  };

  const handleSelectCategory = (category) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    setSelectedCategory(category);
    setOpen(false);
    if (setActiveItem) setActiveItem(category);
    opened.value = withSpring(0, normalSpring);
  };

  const viewAnimatedStyle = useAnimatedStyle(() => {
    if (!buttonWidth) return {};
    const targetWidth = Math.max(buttonWidth, MAX_ITEM_WIDTH); 
    return {
      height: interpolate(opened.value, [0, 1], [buttonHeight, EXPANDED_HEIGHT], "clamp"),
      width: interpolate(opened.value, [0, 1], [buttonWidth, targetWidth], "clamp"),
    };
  });

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    paddingTop: interpolate(opened.value, [0, 1], [0, 5], "clamp"),
    height: interpolate(opened.value, [0, 1], [buttonHeight, buttonHeight + 11], "clamp"),
  }));

  useEffect(() => {
    setButtonWidth(buttonRef.current?.getBoundingClientRect?.()?.width || 0);
  }, [selectedCategory]);

  return {
    open,
    toggleMenu,
    selectedCategory,
    handleSelectCategory,
    viewAnimatedStyle,
    buttonAnimatedStyle,
    buttonRef,
  };
}
