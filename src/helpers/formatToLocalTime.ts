import {DateTime} from 'luxon';
import {APP_MEASURE_UNITS} from '../consts/appMeasureUnits.ts';
import i18next from 'i18next';
import {APP_LANGUAGE} from '../consts/appLanguage.ts';

export const formatToLocalTime = (
  secs: number,
  zone: string,
  appMeasureUnit?: string,
) => {
  const h12 = 'hh:mm a';
  const h24 = 'HH:mm';
  const h12h24 = appMeasureUnit === APP_MEASURE_UNITS.METRIC ? h24 : h12;
  const locale = i18next.language === APP_LANGUAGE.UA ? 'uk' : 'en';

  const localTime = DateTime.fromSeconds(secs)
    .setZone(zone)
    .toFormat(`${h12h24}`, {locale: locale})
    .toUpperCase();

  return localTime;
};
