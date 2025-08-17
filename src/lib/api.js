import axios from "axios";
import { createSecureStorage } from "./storage";
import { URLS } from "@constants/urls";

const jsonConfig = {
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 256000,
};

const mediaConfig = {
	headers: {
		"Content-Type": "multipart/form-data",
	},
	timeout: 256000,
};

const v1Instance = axios.create({
	...jsonConfig,
	baseURL: "https://api.slipe.fun/v1"
});

const v2Instance = axios.create({
	...jsonConfig,
	baseURL: URLS.API_URL,
});

const mediaInstance = axios.create({
	...mediaConfig,
	baseURL: "https://api.slipe.fun/v1",
});

const requestInterceptor = async config => {
	const storage = await createSecureStorage("user-storage");
	const token = storage?.getString("token") || null;
	if (token) {
		if (!config.headers) {
			config.headers = {};
		}
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
};

const responseInterceptor = error => {
	if (error.response) {
		switch (error.response.status) {
			case 401:
				break;
			case 403:
				break;
			case 404:
				break;
			case 500:
				break;
			default:
				break;
		}
	}
	return Promise.reject(error);
};

[v1Instance, v2Instance, mediaInstance].forEach(instance => {
	instance.interceptors.request.use(requestInterceptor);
	instance.interceptors.response.use(response => response, responseInterceptor);
});

export const api = {
	v1: v1Instance,
	v2: v2Instance,
	media: mediaInstance,
};
