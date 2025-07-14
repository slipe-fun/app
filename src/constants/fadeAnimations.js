import { FadeInUp, FadeOutDown, FadeIn, FadeOut } from "react-native-reanimated";
import { fastSpring, normalSpring } from "./easings";

export const getFadeOut = (i = 0) =>
  FadeOut.springify()
    .damping(normalSpring.damping)
    .mass(normalSpring.mass + i * 0.4)
    .stiffness(normalSpring.stiffness);

export const getFadeIn = (i = 0) =>
  FadeIn.springify()
    .damping(normalSpring.damping)
    .mass(normalSpring.mass + i * 0.4)
    .stiffness(normalSpring.stiffness);

export const getCharEnter = (i = 0) =>
  FadeInUp.springify()
    .damping(fastSpring.damping)
    .mass(fastSpring.mass + i * 0.2)
    .stiffness(fastSpring.stiffness);

export const getCharExit = (i = 0) =>
  FadeOutDown.springify()
    .damping(fastSpring.damping)
    .mass(fastSpring.mass + i * 0.2)
    .stiffness(fastSpring.stiffness);
