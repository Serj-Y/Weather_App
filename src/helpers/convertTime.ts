import {DateTime} from 'luxon';
import {APP_MEASURE_UNITS} from '../consts/appMeasureUnits.ts';
import i18next from 'i18next';
import {APP_LANGUAGE} from '../consts/appLanguage.ts';

export const convertTime = (
  time12: string,
  appMeasureUnit: APP_MEASURE_UNITS,
) => {
  const locale = i18next.language === APP_LANGUAGE.UA ? 'uk' : 'en';
  if (appMeasureUnit === APP_MEASURE_UNITS.IMPERIAL) {
    return DateTime.fromFormat(time12, 'hh:mm a')
      .toFormat('hh:mm a', {
        locale: locale,
      })
      .toUpperCase();
  }
  return DateTime.fromFormat(time12, 'hh:mm a').toFormat('HH:mm').toUpperCase();
};
