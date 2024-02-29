import {StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {DateTime} from 'luxon';
import {globalFontWeight, globalStyles} from '../style/GlobalStyles.tsx';
import {useEffect, useState} from 'react';
import {is24HourFormat} from 'react-native-device-time-format';
import {APP_LANGUAGE} from '../consts/appLanguage.ts';

type LastRefreshProps = {
  lastUpdateInSeconds: number;
};
export const LastRefresh = ({lastUpdateInSeconds}: LastRefreshProps) => {
  const {t, i18n} = useTranslation();
  const [is24h, setIs24h] = useState(false);

  useEffect(() => {
    is24HourFormat().then(response => {
      setIs24h(response);
    });
  }, []);

  const locale = i18n.language === APP_LANGUAGE.UA ? 'uk' : 'en';
  const format = is24h ? 'HH:mm' : 'hh:mm a';
  const lastUpdate = DateTime.fromSeconds(lastUpdateInSeconds)
    .setLocale(locale)
    .toFormat(format)
    .toUpperCase();

  return (
    <View style={styles.mainSection}>
      <Text
        style={[
          globalStyles.textSLightColor,
          globalFontWeight.light,
          {opacity: 0.75},
        ]}>
        {t('LastUpdate')} {lastUpdate}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
