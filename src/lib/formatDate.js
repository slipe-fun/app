import { useTranslation } from "react-i18next";

export default function (dateStr) {
  const { t } = useTranslation();

  const [year, month, day] = dateStr.split("-");
  const monthIndex = parseInt(month, 10) - 1;

  const monthKeys = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  const monthName = t(`months.${monthKeys[monthIndex]}`);
  return `${parseInt(day, 10)} ${monthName} ${year}`;
}
