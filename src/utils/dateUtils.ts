export function getDateString(date: Date | any): string {
  if (typeof date !== "object") {
    date = new Date(date);
  }
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

export function getTimeStringFromSeconds(sec_num: number | null | undefined) {
  if (sec_num === null || sec_num === undefined) {
    return "-:-:-";
  }
  let _hours = Math.floor(sec_num / 3600);
  let _minutes = Math.floor((sec_num - _hours * 3600) / 60);
  let _seconds = sec_num - _hours * 3600 - _minutes * 60;
  const hours = _hours < 10 ? "0" + _hours.toFixed(0) : _hours.toFixed(0);
  const minutes =
    _minutes < 10 ? "0" + _minutes.toFixed(0) : _minutes.toFixed(0);
  const seconds =
    _seconds < 10 ? "0" + _seconds.toFixed(0) : _seconds.toFixed(0);
  return hours + ":" + minutes + ":" + seconds;
}
