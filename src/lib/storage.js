import { MMKV, Mode } from 'react-native-mmkv';

export const storage = new MMKV({
  id: `user-storage`,
  encryptionKey: 'your-encryption-key-here'
});