import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import HrLine from '../helpers/ui/HrLine.tsx';
import {globalStyles, globalTextColors} from '../Style/GlobalStyles.tsx';
import Icon from 'react-native-vector-icons/Feather';

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
          <Icon
            name="github"
            size={16}
            color={globalTextColors.lightColor.color}
            onPress={() => Linking.openURL('https://github.com/Serj-Y')}
          />
        </View>
        <Text style={globalStyles.textSLightColor}>
          © 2023 {t('AllRights')}
        </Text>
        <View style={styles.changeLanguageSection}>
          <Icon
            name="globe"
            size={16}
            color={globalTextColors.lightColor.color}
            onPress={() => Linking.openURL('https://github.com/Serj-Y')}
          />
          <TouchableOpacity
            disabled={lang === 'en'}
            onPress={handleChangeLanguageToEN}>
            <Text style={globalStyles.textSLightColor}> EN </Text>
          </TouchableOpacity>
          <Text style={globalStyles.textSLightColor}>|</Text>
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
    marginBottom: 8,
  },
  changeLanguageSection: {
    flexDirection: 'row',
    alignItems: 'center',
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
