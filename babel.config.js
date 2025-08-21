module.exports = {
  presets: ['@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    ['@babel/plugin-transform-private-methods', { loose: true }],
    ['@babel/plugin-transform-private-property-in-object', { loose: true }],
    ['@babel/plugin-transform-class-properties', { loose: true }],
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@components': './src/components',
          '@constants': './src/constants',
          '@hooks': './src/hooks',
          '@lib': './src/lib',
          '@stores': './src/stores',
          '@assets': './assets',
          '@screens': './src/screens',
        },
      },
    ],
    [
      'transform-inline-environment-variables',
      {
        include: ['EXPO_OS'],
      },
    ],
  ],
};
