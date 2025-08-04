import { MMKV } from "react-native-mmkv";
import * as Keychain from "react-native-keychain";
import { Platform } from "react-native";
import QuickCrypto from "react-native-quick-crypto";

const SERVICE_PREFIX = "com.slipe.storage";

const genKey = () => {
  const bytes = QuickCrypto.randomBytes(32); 
  const binary = String.fromCharCode(...bytes);
  return global.btoa(binary);
};

const genOrCreateKey = async (serviceName) => {
  const existing = await Keychain.getGenericPassword({
    service: serviceName,
    authenticationType: Keychain.AUTHENTICATION_TYPE.NONE,
  });

  if (existing) {
    return existing.password;
  }

  const newKey = genKey();

  await Keychain.setGenericPassword("mmkv", newKey, {
    service: serviceName,
    accessible:
      Platform.OS === "ios" ? Keychain.ACCESSIBLE.WHEN_UNLOCKED : undefined,
    authenticationType: Keychain.AUTHENTICATION_TYPE.NONE,
    storage: Platform.OS === "android" ? Keychain.STORAGE_TYPE.AES : undefined,
  });

  return newKey;
};

export const createSecureStorage = async (id) => {
  const serviceName = `${SERVICE_PREFIX}.${id}.${Platform.OS}`;
  const key = await genOrCreateKey(serviceName);
  return new MMKV({ id, key });
};

export const createDefaultStorage = (id) => {
  return new MMKV({ id });
};
