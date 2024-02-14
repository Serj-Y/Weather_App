import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {RiEarthFill, RiGithubFill} from 'react-icons/ri';
import {toast} from 'react-toastify';
import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import HrLine from '../helpers/ui/HrLine.tsx';
import {globalStyles} from '../Style/GlobalStyles.tsx';

export default function Footer() {
  const {t, i18n} = useTranslation();
  const [lang, setLang] = useState('');

  const handleChangeLanguageToEN = () => {
    i18n.changeLanguage('en');
    // toast.info(t('ChangeLang'));
    setLang('en');
  };
  const handleChangeLanguageToUA = () => {
    i18n.changeLanguage('ua');
    // toast.info(t('ChangeLang'));
    setLang('ua');
  };
  return (
    <>
      <HrLine />
      <View style={styles.footerSection}>
        <View style={styles.contactsSection}>
          <Text style={globalStyles.textSLightColor}>{t('ContactUs')}: </Text>
          {/*<RiGithubFill className="  text-white ml-1 cursor-pointer transition ease-out hover:scale-125" />*/}
          <Text
            style={globalStyles.textSLightColor}
            onPress={() => Linking.openURL('https://github.com/Serj-Y')}>
            GitHub
          </Text>
        </View>
        <Text style={globalStyles.textSLightColor}>
          © 2023 {t('AllRights')}
        </Text>
        <View style={styles.footerSection}>
          {/*<RiEarthFill className="text-white mr-1" />*/}
          <TouchableOpacity
            disabled={lang === 'en'}
            onPress={handleChangeLanguageToEN}>
            <Text style={globalStyles.textSLightColor}> EN </Text>
          </TouchableOpacity>
          <Text style={globalStyles.textMLightColor}>|</Text>
          <TouchableOpacity
            disabled={lang === 'ua'}
            onPress={handleChangeLanguageToUA}>
            <Text style={globalStyles.textSLightColor}> UA </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  footerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  changeLanguage: {
    fontSize: globalStyles.textMLightColor.fontSize,
    fontWeight: globalStyles.textMLightColor.fontWeight,
    color: globalStyles.textMLightColor.color,
  },
  contactsSection: {
    flexDirection: 'row',
  },
});
