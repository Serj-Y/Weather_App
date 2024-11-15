import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import {APP_LANGUAGE} from '../../consts/appLanguage';
import en from './locales/en.json';
import ua from './locales/ua.json';

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  fallbackLng: APP_LANGUAGE.EN,
  resources: {
    en: {translation: en},
    ua: {translation: ua},
  },
});
