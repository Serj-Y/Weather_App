import {DateTime} from 'luxon';
import i18next from 'i18next';
import {APP_LANGUAGE} from '../consts/appLanguage.ts';

export const formatToLocalDate = (
  secs: number,
  zone: string,
  format?: string,
) => {
  const locale = i18next.language === APP_LANGUAGE.UA ? 'uk' : 'en';

  const localDate = DateTime.fromSeconds(secs)
    .setZone(zone)
    .toFormat(format ? format : "EEEE, DD'", {
      locale: locale,
    });
  return localDate;
};
