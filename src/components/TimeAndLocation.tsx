import React from 'react';
import {formatToLocalTime} from '../helpers/helpers';
import {WeatherType} from '../types/Types';
import {StyleSheet, Text, View} from 'react-native';
import {
  globalFontWeight,
  globalStyles,
  globalTextColors,
} from '../Style/GlobalStyles.tsx';

export type TimeAndLocationPropsType = {
  weather: WeatherType;
  isFahrenheit: boolean;
};

export default function TimeAndLocation({
  weather: {localtime_epoch, tz_id, name, country},
  isFahrenheit,
}: TimeAndLocationPropsType) {
  return (
    <>
      <View style={styles.timeSection}>
        <Text style={[globalStyles.textMLightColor, globalFontWeight.light]}>
          {' '}
          {formatToLocalTime(localtime_epoch, tz_id, undefined, isFahrenheit)}
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
    marginVertical: 8,
  },
  countySection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
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
