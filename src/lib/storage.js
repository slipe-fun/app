import { MMKV } from "react-native-mmkv";
import * as Keychain from "react-native-keychain";
import { Platform } from "react-native";
import { randomBytes } from "react-native-randombytes";

const SERVICE_NAME = `com.slipe.storage.${Platform.OS}`;
let _storage = null;

const genKey = () =>
	new Promise((resolve, reject) => {
		randomBytes(32, (err, bytes) => {
			if (err) reject(err);
			else resolve(bytes.toString("base64"));
		});
	});

const genOrCreateKey = async () => {
	const existing = await Keychain.getGenericPassword({
		service: SERVICE_NAME,
		authenticationType: Keychain.AUTHENTICATION_TYPE.NONE,
	});

	if (existing) {
		return existing.password;
	}

	const newKey = await genKey();

	await Keychain.setGenericPassword("mmkv", newKey, {
		service: SERVICE_NAME,
		accessible: Platform.OS === "ios" ? Keychain.ACCESSIBLE.WHEN_UNLOCKED : undefined,
		authenticationType: Keychain.AUTHENTICATION_TYPE.NONE,
		storage: Platform.OS === "android" ? Keychain.STORAGE_TYPE.AES : undefined,
	});

	return newKey;
};

export const storage = async () => {
	if (_storage) {
		return _storage;
	}
	const key = await genOrCreateKey();
	_storage = new MMKV({ id: "user-storage", key });
	return _storage;
};
