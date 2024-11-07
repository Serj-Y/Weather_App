import {DateTime} from 'luxon';
import {APP_MEASURE_UNITS} from '../consts/appMeasureUnits.ts';
import {convertOptionNameFromI18ToLuxon} from './convertOptionNameFromI18ToLuxon.ts';

export const convertTime = (
  time12: string,
  appMeasureUnit: APP_MEASURE_UNITS,
) => {
  const locale = convertOptionNameFromI18ToLuxon();
  const is12hour = appMeasureUnit === APP_MEASURE_UNITS.IMPERIAL;
  return  DateTime.fromFormat(time12, 'hh:mm a')
        .setLocale(locale)
        .toLocaleString({hour: '2-digit', minute: '2-digit', hour12: is12hour})
        .toUpperCase();
};
