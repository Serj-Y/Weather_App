import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, Text, View} from 'react-native';
import {
  globalFontWeight,
  globalHorizontalMargin,
  globalStyles,
  globalTextColors,
  globalVerticalMargin,
  globalVerticalPadding,
} from '../style/GlobalStyles.tsx';
import Icon from 'react-native-vector-icons/Feather';
import {convertTemperatureUnits} from '../helpers/convertTemperatureUnits.ts';
import {convertSpeedUnits} from '../helpers/convertSpeedUnits.ts';
import {convertTime} from '../helpers/convertTime.ts';

type PropsType = {
  weather: {
    icon: string;
    text: string;
    temp_c: number;
    feelslike_c: number;
    humidity: number;
    wind_kph: number;
    sunrise: string;
    sunset: string;
    maxtemp_c: number;
    mintemp_c: number;
  };
  isFahrenheit: boolean;
};

export default function TemperatureAndDetails({
  weather: {
    icon,
    text,
    feelslike_c,
    temp_c,
    humidity,
    wind_kph,
    sunrise,
    sunset,
    maxtemp_c,
    mintemp_c,
  },
  isFahrenheit,
}: PropsType) {
  const {t} = useTranslation();
  return (
    <>
      <View style={styles.feelsSection}>
        <Text style={globalStyles.textMLightColor}>{text}</Text>
      </View>
      <View style={styles.forecastSection}>
        <Image
          style={{width: 80, height: 80}}
          source={{uri: `https:${icon}`}}
        />
        <Text style={globalStyles.textXLLightColor}>
          {convertTemperatureUnits(temp_c, isFahrenheit)}
        </Text>
        <View style={styles.forecastDetailsSection}>
          <View style={styles.forecastDataSection}>
            <Icon
              name="thermometer"
              size={18}
              color={globalTextColors.lightColor.color}
            />
            <Text style={globalStyles.textSLightColor}>
              <Text style={globalFontWeight.light}> {t('Realfeel')}: </Text>
              {convertTemperatureUnits(feelslike_c, isFahrenheit)}
            </Text>
          </View>
          <View style={styles.forecastDataSection}>
            <Icon
              name="droplet"
              size={18}
              color={globalTextColors.lightColor.color}
            />
            <Text style={globalStyles.textSLightColor}>
              <Text style={globalFontWeight.light}> {t('Humidity')}: </Text>
              {humidity}%
            </Text>
          </View>
          <View style={styles.forecastDataSection}>
            <Icon
              name="wind"
              size={18}
              color={globalTextColors.lightColor.color}
            />
            <Text style={globalStyles.textSLightColor}>
              <Text style={globalFontWeight.light}> {t('Wind')}: </Text>
              {convertSpeedUnits(wind_kph, isFahrenheit)}
              {isFahrenheit ? t('WindSpeedMph') : t('WindSpeedKph')}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.forecastDataBottomSection}>
        <Icon
          name="sunrise"
          size={16}
          color={globalTextColors.lightColor.color}
        />
        <Text style={[globalStyles.textSLightColor, globalFontWeight.bold]}>
          {convertTime(sunrise, isFahrenheit)}
        </Text>
        <Text style={globalStyles.textSLightColor}>|</Text>
        <Icon
          name="arrow-up"
          size={16}
          color={globalTextColors.lightColor.color}
        />
        <Text style={[globalStyles.textSLightColor, globalFontWeight.bold]}>
          {convertTemperatureUnits(maxtemp_c, isFahrenheit)}
        </Text>
        <Text style={globalStyles.textSLightColor}>|</Text>
        <Icon
          name="arrow-down"
          size={16}
          color={globalTextColors.lightColor.color}
        />
        <Text style={[globalStyles.textSLightColor, globalFontWeight.bold]}>
          {convertTemperatureUnits(mintemp_c, isFahrenheit)}
        </Text>
        <Text style={globalStyles.textSLightColor}>|</Text>
        <Icon
          name="sunset"
          size={16}
          color={globalTextColors.lightColor.color}
        />
        <Text style={[globalStyles.textSLightColor, globalFontWeight.light]}>
          <Text style={[globalFontWeight.bold]}>
            {convertTime(sunset, isFahrenheit)}
          </Text>
        </Text>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  feelsSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: globalVerticalPadding.normal.paddingVertical,
    fontSize: 24,
    fontWeight: '200',
  },
  forecastSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: globalVerticalPadding.normal.paddingVertical,
  },
  forecastDetailsSection: {
    flexDirection: 'column',
    marginVertical: 6,
  },
  forecastDataSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
    flexDirection: 'row',
  },
  forecastDataBottomSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: globalVerticalMargin.normal.marginVertical,
    marginHorizontal: globalHorizontalMargin.normal.marginHorizontal,
  },
});
