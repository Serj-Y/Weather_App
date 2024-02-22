import {DateTime} from 'luxon';

export const formatToLocalTime = (
  secs: number,
  zone: string,
  format?: string,
  isFahrenheit?: boolean,
) => {
  const h12 = 'hh:mm a';
  const h24 = 'HH:mm';
  const h12h24 = isFahrenheit ? h12 : h24;
  return DateTime.fromSeconds(secs)
    .setZone(zone)
    .toFormat(
      format ? format : `cccc, dd LLLL yyyy' | ${'Local time:'} '${h12h24}`,
    );
};
