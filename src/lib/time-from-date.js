import { useTranslation } from "react-i18next";

export default function TimePassedFromDate(time) {
	const { t } = useTranslation();
	const elapsedSeconds = Math.floor((Date.now() - new Date(time)) / 1000);

	const timeUnits = [
		{ key: "year", seconds: 31536000 },
		{ key: "month", seconds: 2592000 },
		{ key: "week", seconds: 604800 },
		{ key: "day", seconds: 86400 },
		{ key: "hour", seconds: 3600 },
		{ key: "minute", seconds: 60 },
		{ key: "second", seconds: 1 },
	];

	for (const { key, seconds } of timeUnits) {
		const value = Math.floor(elapsedSeconds / seconds);
		if (value > 0) {
			return `${value}${t(`timeUnits.${key}`)}`;
		}
	}

	return `1${t("timeUnits.second")}`;
}
