import { FadeInUp, FadeOutDown, FadeIn, FadeOut } from "react-native-reanimated";
import { fastSpring, normalSpring } from "./easings";

export const getFadeIn = () =>
  FadeInUp.springify()
    .damping(normalSpring.damping)
    .mass(normalSpring.mass)
    .stiffness(normalSpring.stiffness);

export const getFadeOut = () =>
  FadeOutDown.springify()
    .damping(normalSpring.damping)
    .mass(normalSpring.mass)
    .stiffness(normalSpring.stiffness);

export const getFadeOutSimple = () =>
  FadeOut.springify()
    .damping(normalSpring.damping)
    .mass(normalSpring.mass)
    .stiffness(normalSpring.stiffness);

export const getFadeInSimple = () =>
  FadeIn.springify()
    .damping(normalSpring.damping)
    .mass(normalSpring.mass)
    .stiffness(normalSpring.stiffness);

export const getCharEnter = (i) =>
  FadeInUp.springify()
    .damping(fastSpring.damping)
    .mass(fastSpring.mass + i * 0.2)
    .stiffness(fastSpring.stiffness);

export const getCharExit = (i) =>
  FadeOutDown.springify()
    .damping(fastSpring.damping)
    .mass(fastSpring.mass + i * 0.2)
    .stiffness(fastSpring.stiffness);
