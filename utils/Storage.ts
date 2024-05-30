import { MMKV } from 'react-native-mmkv';

// TODO Add encryption key to MMKV
export const Storage = new MMKV({
  id: 'com.andrewheim.storage',
})