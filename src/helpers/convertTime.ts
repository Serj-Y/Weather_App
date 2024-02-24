import {DateTime} from 'luxon';
import {APP_MEASURE_UNITS} from '../consts/appMeasureUnits.ts';

export const convertTime = (
  time12: string,
  appMeasureUnit: APP_MEASURE_UNITS,
) => {
  if (appMeasureUnit === APP_MEASURE_UNITS.IMPERIAL) {
    return time12;
  } else {
    return DateTime.fromFormat(time12, 'hh:mm a').toFormat('HH:mm');
  }
};
