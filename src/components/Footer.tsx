import React from 'react';
import {useTranslation} from 'react-i18next';
import {Linking, StyleSheet, Text, View} from 'react-native';
import {globalStyles, globalTextColors} from '../style/GlobalStyles.tsx';
import Icon from 'react-native-vector-icons/Feather';
import {Toast} from 'toastify-react-native';
import HrLine from './HrLine.tsx';
import {APP_LANGUAGE} from '../consts/appLanguage.ts';
import {storeStringData} from '../services/asyncStorage/storeStringData.ts';
import PressableOpacity from './PressableOpacity.tsx';
import {HAPTIC_FEEDBACK, HapticFeedback} from '../utils/hapticFeedback.ts';

export default function Footer() {
  const {t, i18n} = useTranslation();
  const i18CurrentLang = i18n.language;

  const handleChangeLanguage = (language: APP_LANGUAGE) => {
    i18n.changeLanguage(language);
    Toast.success(t('ChangeLang'));
    storeStringData({key: 'AppLang', value: language});
    HapticFeedback({feedbackType: HAPTIC_FEEDBACK.SUCCESS});
  };

  const onPressGitLink = () => {
    Linking.openURL('https://github.com/Serj-Y');
  };

  return (
    <>
      <HrLine />
      <View style={styles.footerSection}>
        <PressableOpacity onPress={onPressGitLink}>
          <Icon
            name="github"
            size={16}
            color={globalTextColors.lightColor.color}
          />
        </PressableOpacity>
        <View style={styles.footerSection}>
          <Icon
            name="globe"
            size={16}
            color={globalTextColors.lightColor.color}
          />
          <PressableOpacity
            disabled={i18CurrentLang === APP_LANGUAGE.UA}
            onPress={() => handleChangeLanguage(APP_LANGUAGE.UA)}>
            <Text style={globalStyles.textMLightColor}>UA</Text>
          </PressableOpacity>
          <Text style={globalStyles.textSLightColor}>|</Text>
          <PressableOpacity
            disabled={i18CurrentLang === APP_LANGUAGE.EN}
            onPress={() => handleChangeLanguage(APP_LANGUAGE.EN)}>
            <Text style={globalStyles.textMLightColor}>EN</Text>
          </PressableOpacity>
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
    marginVertical: 8,
    marginHorizontal: 6,
  },
  changeLanguageSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
