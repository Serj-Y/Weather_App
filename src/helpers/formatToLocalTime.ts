import {DateTime} from 'luxon';
import {APP_MEASURE_UNITS} from '../consts/appMeasureUnits.ts';
import i18next from 'i18next';
import {GetAppLangForLuxon} from './getCurrentLangForLuxon.ts';

export const formatToLocalTime = (
  secs: number,
  zone: string,
  format?: string,
  appMeasureUnit?: string,
) => {
  const h12 = 'hh:mm a';
  const h24 = 'HH:mm';
  const h12h24 = appMeasureUnit === APP_MEASURE_UNITS.IMPERIAL ? h12 : h24;
  return DateTime.fromSeconds(secs)
    .setZone(zone)
    .toFormat(
      format ? format : `EEEE, DD' | ${i18next.t('LocalTime')} '${h12h24}`,
      {
        locale: GetAppLangForLuxon(),
      },
    );
};
