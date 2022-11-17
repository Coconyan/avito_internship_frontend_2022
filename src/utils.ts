
export const convertUnixTimeToDate = (unixTime: number) => {
  const time = new Date(unixTime * 1000);
  return time.toLocaleString();
}