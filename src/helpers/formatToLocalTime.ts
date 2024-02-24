import {DateTime} from 'luxon';
import {APP_MEASURE_UNITS} from '../consts/appMeasureUnits.ts';

export const formatToLocalTime = (
  secs: number,
  zone: string,
  format?: string,
  appMeasureUnit?: APP_MEASURE_UNITS,
) => {
  const h12 = 'hh:mm a';
  const h24 = 'HH:mm';
  const h12h24 = appMeasureUnit === APP_MEASURE_UNITS.IMPERIAL ? h12 : h24;
  return DateTime.fromSeconds(secs)
    .setZone(zone)
    .toFormat(
      format ? format : `cccc, dd LLLL yyyy' | ${'Local time:'} '${h12h24}`,
    );
};
