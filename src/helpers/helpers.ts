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

export const convertFrom12To24Format = (
  time12: string,
  isFahrenheit: boolean,
) => {
  if (isFahrenheit) {
    return time12;
  } else {
    return DateTime.fromFormat(time12, 'hh:mm a').toFormat('HH:mm');
  }
};

export const celsiusToFahrenheit = (celsius: number, isFahrenheit: boolean) => {
  if (isFahrenheit) {
    const tempF = celsius * (9 / 5) + 32;
    return tempF.toFixed() + '°F';
  } else {
    const tempC = celsius;
    return tempC.toFixed() + '°C';
  }
};

export const kmToMph = (kmh: number, isFahrenheit: boolean) => {
  const mph = kmh / 1.609344;
  if (isFahrenheit) {
    return mph.toFixed(1);
  } else {
    return kmh.toFixed(1);
  }
};
