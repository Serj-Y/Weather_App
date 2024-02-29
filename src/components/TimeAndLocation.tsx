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
import {useTranslation} from 'react-i18next';

export type TimeAndLocationPropsType = {
  weather: WeatherType;
  appMeasureUnit: APP_MEASURE_UNITS;
};

export const TimeAndLocation = ({
  weather: {localtime_epoch, tz_id, name, country},
  appMeasureUnit,
}: TimeAndLocationPropsType) => {
  const {t} = useTranslation();
  return (
    <>
      <View style={styles.section}>
        <Text
          style={[
            globalStyles.textMLightColor,
            globalFontWeight.light,
            {textTransform: 'capitalize'},
          ]}>
          {formatToLocalDate(localtime_epoch, tz_id)}
        </Text>
        <Text style={[globalStyles.textMLightColor, globalFontWeight.light]}>
          {' | '}
          {t('LocalTime')}
          {formatToLocalTime(localtime_epoch, tz_id, appMeasureUnit)}
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.location}>{name},</Text>
        <Text style={styles.location}>{country}</Text>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  section: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: globalVerticalMargin.normal.marginVertical,
    flexWrap: 'wrap',
  },
  location: {
    color: globalTextColors.lightColor.color,
    alignItems: 'center',
    fontSize: 24,
    fontWeight: globalFontWeight.bold.fontWeight,
    marginHorizontal: 2,
  },
});
