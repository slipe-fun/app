import { createFont, createTamagui, createTokens } from 'tamagui'
import { createAnimations } from '@tamagui/animations-moti'
import { Easing } from 'react-native-reanimated'

const openRundeFont = createFont({
  family: 'OpenRunde',
  size: {
    0.5: 11,
    0.75: 12,
    1: 13,
    2: 14,
    3: 15,
    4: 16,
    5: 18,
    6: 20,
    7: 22,
    7.5: 24,
    8: 26,
    9: 28,
    true: 16,
  },
  weight: {
    1: '400',
    2: '500',
    3: '600',
    4: '700',
    true: '500',
  },
  lineHeight: {
    0.5: 13,
    0.75: 15,
    1: 16,
    2: 17,
    3: 18,
    4: 19,
    5: 22,
    6: 24,
    7: 27,
    7.5: 29,
    8: 31,
    9: 34,
  },
  letterSpacing: {
    1: 0,
    2: -0.2,
    3: -0.25,
    4: -0.3,
    5: -0.35,
    6: -0.4,
    7: -0.45,
    8: -0.5,
  },
  face: {
    400: { normal: 'OpenRunde-Regular' },
    500: { normal: 'OpenRunde-Medium' },
    600: { normal: 'OpenRunde-Semibold' },
    700: { normal: 'OpenRunde-Bold' },
  },
})

export const tokens = createTokens({
  size: {
    0.5: 5,
    0.75: 6,
    1: 13,
    2: 14,
    3: 15,
    4: 16,
    5: 18,
    6: 20,
    7: 22,
    7.5: 24,
    8: 26,
    9: 28,
    10: 32,
    11: 36,
    12: 40,
    13: 44,
    14: 48,
    15: 52,
    16: 56,
    17: 60,
    18: 64,
    19: 68,
    20: 72,
    21: 90,
    22: 100,
    23: 120,
    24: 140,
    25: 160,
    26: 200,
    27: 240,
    true: 16,
  },
  weight: {
    1: '400',
    2: '500',
    3: '600',
    4: '700',
    true: '500',
  },
  lineHeight: {
    1: 16,
    2: 17,
    3: 18,
    4: 19,
    5: 22,
    6: 24,
    7: 27,
    8: 31,
    9: 34,
    true: 22,
  },
  space: {
    0: 0,
    0.5: 2,
    1: 4,
    2: 6,
    3: 8,
    4: 10,
    4.5: 11,
    5: 12,
    5.5: 14,
    6: 16,
    6.5: 18,
    7: 20,
    7.5: 22,
    8: 24,
    9: 28,
    10: 32,
    11: 42,
    12: 60,
    true: 16,
  },
  radius: {
    0: 0,
    1: 8,
    2: 10,
    3: 12,
    4: 14,
    5: 16,
    6: 18,
    7: 20,
    8: 22,
    9: 24,
    10: 26,
    11: 28,
    12: 32,
    full: 999,
    true: 16,
  },
  zIndex: {
    0: 0,
    1: 10,
    2: 20,
    3: 30,
    4: 40,
    5: 50,
    6: 60,
    7: 70,
    8: 80,
    9: 90,
    10: 100,
  },
  color: {
    white: '#fff',
    primary: '#1A6AFF',
    glassButton: 'rgba(31, 31, 31, 0.24)',
    red: '#FF1A1A',
    innerBlockDark: '#333333',
    innerBlockLight: '#CCCCCC',
    elemBackgroundDark: '#1F1F1F',
    yellow: '#FF9F0A',
    elemBackgroundLight: '#E0E0E0',
    indicator: 'rgba(255, 255, 255, 0.3)',
    navigationBackgroundDark: 'rgba(0, 0, 0, 0.6)',
    navigationBackgroundLight: 'rgba(255, 255, 255, 0.6)',
    transparentText: 'rgba(255, 255, 255, 0.7)',
    transparentIconDark: 'rgba(255, 255, 255, 0.35)',
    transparentIconLight: 'rgba(0, 0, 0, 0.35)',
    black: '#000',
    separatorLight: 'rgba(0, 0, 0, 0.2)',
    separatorDark: 'rgba(255, 255, 255, 0.2)',
  },
})

const animations = createAnimations({
  fast: {
    type: 'spring',
    damping: 20,
    mass: 1.2,
    stiffness: 250,
  },
  medium: {
    type: 'spring',
    damping: 15,
    mass: 1,
    stiffness: 200,
  },
  slow: {
    type: 'spring',
    damping: 15,
    stiffness: 50,
  },
  quick: {
    type: 'timing',
    duration: 125,
    easing: Easing.inOut(Easing.ease),
  },
});

const configUI = createTamagui({
  fonts: {
    heading: openRundeFont,
    body: openRundeFont,
  },
  tokens,
  animations,

  themes: {
    light: {
      secondaryText: tokens.color.transparentIconLight,
      bg: tokens.color.white,
      glassButton: tokens.color.glassButton,
      primary: tokens.color.primary,
      color: tokens.color.black,
      innerBlock: tokens.color.innerBlockLight,
      navigationBackground: tokens.color.navigationBackgroundLight,
      separator: tokens.color.separatorLight,
      backgroundTransparent: tokens.color.elemBackgroundLight,
    },
    dark: {
      secondaryText: tokens.color.transparentIconDark,
      bg: tokens.color.black,
      innerBlock: tokens.color.innerBlockDark,
      primary: tokens.color.primary,
      glassButton: tokens.color.glassButton,
      color: tokens.color.white,
      navigationBackground: tokens.color.navigationBackgroundDark,
      separator: tokens.color.separatorDark,
      backgroundTransparent: tokens.color.elemBackgroundDark,
    },
  },

  shorthands: {
    ph: 'paddingHorizontal',
    mh: 'marginHorizontal',
    pv: 'paddingVertical',
    p: 'padding',
    m: 'margin',
    f: 'flex',
    w: 'width',
    h: 'height',
    pt: 'paddingTop',
    pb: 'paddingBottom',
    pr: 'paddingRight',
    pl: 'paddingLeft',
    mt: 'marginTop',
    br: 'borderRadius',
    mb: 'marginBottom',
    mr: 'marginRight',
    ml: 'marginLeft',
    fz: 'fontSize',
    fw: 'fontWeight',
    lh: 'lineHeight',
    bc: 'backgroundColor',
  },

  defaultProps: {
    Text: {
      color: '$color',
      fontFamily: '$body',
      fontSize: '$4',
      lineHeight: '$4',
    },
    Button: {
      backgroundColor: '$primary',
      borderRadius: '$3',
    },
  },
  defaultFont: '$body',
})

export default configUI