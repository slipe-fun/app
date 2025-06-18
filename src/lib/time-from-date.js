import timeUnits from "@constants/time-units";

export default function TimePassedFromDate(time) {
  const elapsedSeconds = Math.floor((Date.now() - new Date(time)) / 1000);

  for (const { label, seconds } of timeUnits) {
    const value = Math.floor(elapsedSeconds / seconds);
    if (value > 0) {
      return `${value}${label}`;
    }
  }
  return "1s";
}
