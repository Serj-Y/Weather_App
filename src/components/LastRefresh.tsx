import {StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {globalFontWeight, globalStyles} from '../style/GlobalStyles';
import {useEffect, useState} from 'react';
// import {is24HourFormat} from 'react-native-device-time-format'; //fix
import {APP_MEASURE_UNITS} from '../consts/appMeasureUnits';
import {Convert} from '../helpers/Convert';

type LastRefreshProps = {
  lastUpdateInSeconds: number;
};
export const LastRefresh = ({lastUpdateInSeconds}: LastRefreshProps) => {
  const {t} = useTranslation();
  const [is24h, setIs24h] = useState(false);

  useEffect(() => {
    // is24HourFormat().then(response => {
    //   setIs24h(response);

    // });
      setIs24h(true)
  }, [])

  const format = is24h ? APP_MEASURE_UNITS.METRIC : APP_MEASURE_UNITS.IMPERIAL;

  const lastUpdate = Convert.fromLocaltimeEpochToHour(lastUpdateInSeconds, undefined, format);

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
