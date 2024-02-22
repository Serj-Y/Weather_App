import {DateTime} from 'luxon';

export const convertTime = (time12: string, isFahrenheit: boolean) => {
  if (isFahrenheit) {
    return time12;
  } else {
    return DateTime.fromFormat(time12, 'hh:mm a').toFormat('HH:mm');
  }
};
