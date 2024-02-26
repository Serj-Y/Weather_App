import React from 'react';
import {WeatherType} from '../types/Types';
import {StyleSheet, Text, View} from 'react-native';
import {
  globalFontWeight,
  globalStyles,
  globalTextColors,
  globalVerticalMargin,
} from '../style/GlobalStyles.tsx';
import {formatToLocalTime} from '../helpers/formatToLocalTime.ts';
import {APP_MEASURE_UNITS} from '../consts/appMeasureUnits.ts';
import {formatToLocalDate} from '../helpers/formatToLocalDate.ts';
import i18next from 'i18next';

export type TimeAndLocationPropsType = {
  weather: WeatherType;
  appMeasureUnit: APP_MEASURE_UNITS;
};

export default function TimeAndLocation({
  weather: {localtime_epoch, tz_id, name, country},
  appMeasureUnit,
}: TimeAndLocationPropsType) {
  return (
    <>
      <View style={styles.timeSection}>
        <Text style={[globalStyles.textMLightColor, globalFontWeight.light]}>
          <Text style={{textTransform: 'capitalize'}}>
            {formatToLocalDate(localtime_epoch, tz_id)}
          </Text>
          <Text>
            {' | '}
            {i18next.t('LocalTime')}
            {formatToLocalTime(localtime_epoch, tz_id, appMeasureUnit)}
          </Text>
        </Text>
      </View>
      <View style={styles.countySection}>
        <Text style={styles.country}>
          {name}, {country}
        </Text>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  timeSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: globalVerticalMargin.normal.marginVertical,
  },
  countySection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: globalVerticalMargin.normal.marginVertical,
  },
  country: {
    color: globalTextColors.lightColor.color,
    alignItems: 'center',
    fontSize: 24,
    fontWeight: globalFontWeight.extraBold.fontWeight,
    overflow: 'hidden',
    flexWrap: 'nowrap',
  },
});
