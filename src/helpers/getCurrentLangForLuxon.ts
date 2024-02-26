import i18next from 'i18next';
import {APP_LANGUAGE} from '../consts/appLanguage.ts';

export const GetAppLangForLuxon = () => {
  return i18next.language === APP_LANGUAGE.UA ? 'uk' : 'en';
};
