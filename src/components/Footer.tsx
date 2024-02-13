import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {RiEarthFill, RiGithubFill} from 'react-icons/ri';
import {toast} from 'react-toastify';

export default function Footer() {
  const {t, i18n} = useTranslation();
  const [lang, setLang] = useState('');

  const handleChangeLanguageToEN = () => {
    i18n.changeLanguage('en');
    toast.info(t('ChangeLang'));
    setLang('en');
  };
  const handleChangeLanguageToUA = () => {
    i18n.changeLanguage('uk');
    toast.info(t('ChangeLang'));
    setLang('uk');
  };
  return (
    <div>
      <hr className="my-2" />
      <div className="flex items-center justify-between">
        <div className="flex  items-center justify-between">
          <p className="text-xs  text-white">{t('ContactUs')}</p>
          <a
            href="https://github.com/Serj-Y"
            target="_blank"
            rel="noopener noreferrer">
            <RiGithubFill className="  text-white ml-1 cursor-pointer transition ease-out hover:scale-125" />
          </a>
        </div>
        <p className="text-xs text-white">© 2023 {t('AllRights')}</p>
        <div className="flex flex-row items-center justify-between">
          <RiEarthFill className="text-white mr-1" />
          <button
            className="text-xs  text-white font-light cursor-pointer transition ease-out hover:scale-125"
            disabled={lang === 'en'}
            onClick={handleChangeLanguageToEN}>
            EN
          </button>
          <p className="text-xs  text-white mx-1">|</p>
          <button
            className="text-xs text-white font-light cursor-pointer transition ease-out hover:scale-125"
            disabled={lang === 'uk'}
            onClick={handleChangeLanguageToUA}>
            UA
          </button>
        </div>
      </div>
    </div>
  );
}
