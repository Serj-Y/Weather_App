import i18next from 'i18next';
import {readingStoredStringData} from '../asyncStorage/readingStoredStringData.ts';
import {APP_LANGUAGE} from '../../consts/appLanguage.ts';

export const GetAppLanguageFromStorage = () => {
  readingStoredStringData('AppLang').then(res =>
    res ? i18next.changeLanguage(res) : i18next.changeLanguage(APP_LANGUAGE.EN),
  );
};
