import React from 'react';
import {useTranslation} from 'react-i18next';
import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  globalHorizontalMargin,
  globalStyles,
  globalTextColors,
  globalVerticalMargin,
} from '../style/GlobalStyles.tsx';
import Icon from 'react-native-vector-icons/Feather';
import {Toast} from 'toastify-react-native';
import HrLine from './HrLine.tsx';
import {APP_LANGUAGE} from '../consts/appLanguage.ts';
import {storeStringData} from '../services/asyncStorage/storeStringData.ts';

export default function Footer() {
  const {t, i18n} = useTranslation();
  const i18CurrentLang = i18n.language;
  const handleChangeLanguageToEN = () => {
    i18n.changeLanguage(APP_LANGUAGE.EN);
    Toast.success(t('ChangeLang'));
    storeStringData({key: 'AppLang', value: APP_LANGUAGE.EN});
  };
  const handleChangeLanguageToUA = () => {
    i18n.changeLanguage(APP_LANGUAGE.UA);
    Toast.success(t('ChangeLang'));
    storeStringData({key: 'AppLang', value: APP_LANGUAGE.UA});
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
        <View style={styles.changeLanguage}>
          <Icon
            name="globe"
            size={16}
            color={globalTextColors.lightColor.color}
          />
          <TouchableOpacity
            disabled={i18CurrentLang === APP_LANGUAGE.UA}
            onPress={handleChangeLanguageToUA}>
            {i18CurrentLang === APP_LANGUAGE.EN ? (
              <Text style={globalStyles.textMLightColor}>UA</Text>
            ) : (
              <Text style={[globalStyles.textMLightColor, {opacity: 0.5}]}>
                UA
              </Text>
            )}
          </TouchableOpacity>
          <Text style={globalStyles.textSLightColor}>|</Text>
          <TouchableOpacity
            disabled={i18CurrentLang === APP_LANGUAGE.EN}
            onPress={handleChangeLanguageToEN}>
            {i18CurrentLang === APP_LANGUAGE.UA ? (
              <Text style={globalStyles.textMLightColor}>EN</Text>
            ) : (
              <Text style={[globalStyles.textMLightColor, {opacity: 0.5}]}>
                EN
              </Text>
            )}
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
    marginVertical: globalVerticalMargin.normal.marginVertical,
    marginHorizontal: globalHorizontalMargin.normal.marginHorizontal,
  },
  changeLanguageSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  changeLanguage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '25%',
  },
  contactsSection: {
    flexDirection: 'row',
  },
});
