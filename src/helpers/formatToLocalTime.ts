import {DateTime} from 'luxon';
import {APP_MEASURE_UNITS} from '../consts/appMeasureUnits.ts';
import {convertOptionNameFromI18ToLuxon} from './convertOptionNameFromI18ToLuxon.ts';

export const formatToLocalTime = (
  secs: number,
  zone?: string,
  appMeasureUnit?: string,
) => {
  const is12h = appMeasureUnit === APP_MEASURE_UNITS.IMPERIAL;
  const locale = convertOptionNameFromI18ToLuxon();

  return DateTime.fromSeconds(secs)
    .setZone(zone)
    .setLocale(locale)
    .toLocaleString({hour: '2-digit', minute: '2-digit', hour12: is12h})
    .toUpperCase();
};
