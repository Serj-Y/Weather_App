import React from 'react';
import {formatToLocalTime} from '../helpers/helpers';
import {WeatherType} from '../types/Types';
import {StyleSheet, Text, View} from 'react-native';

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
        <Text style={styles.time}>
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
    marginVertical: 24,
  },
  time: {
    color: '#fff',
    alignItems: 'center',
    fontSize: 16,
    fontWeight: '200',
  },
  countySection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  country: {
    color: '#fff',
    alignItems: 'center',
    fontSize: 24,
    fontWeight: '600',
    overflow: 'hidden',
    flexWrap: 'nowrap',
  },
});
