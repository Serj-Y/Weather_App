import React from 'react';
import {
  BsArrowUp,
  BsArrowDown,
  BsWind,
  BsSunset,
  BsSunrise,
} from 'react-icons/bs';
import {FaTemperatureHalf} from 'react-icons/fa6';
import {WiHumidity} from 'react-icons/wi';
import {useTranslation} from 'react-i18next';
import {
  celsiusToFahrenheit,
  convertFrom12To24Format,
  kmToMph,
} from '../helpers/helpers';
import {Image, StyleSheet, Text, View} from 'react-native';
import {globalFontWeight, globalStyles} from '../Style/GlobalStyles.tsx';

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
        <Image width={80} src={icon} alt="img" />
        <Text style={globalStyles.textXLLightColor}>
          {celsiusToFahrenheit(temp_c, isFahrenheit)}°
        </Text>
        <View style={styles.forecastDetailsSection}>
          <View style={styles.forecastDataSection}>
            {/*<FaTemperatureHalf size={18} className="mr-1" />*/}
            <Text style={globalStyles.textSLightColor}>
              <Text style={globalFontWeight.light}> {t('Realfeel')}: </Text>
              {celsiusToFahrenheit(feelslike_c, isFahrenheit)}°
            </Text>
          </View>
          <View style={styles.forecastDataSection}>
            {/*<WiHumidity size={18} className="mr-1" />*/}
            <Text style={globalStyles.textSLightColor}>
              <Text style={globalFontWeight.light}> {t('Humidity')}: </Text>
              {humidity}%
            </Text>
          </View>
          <View style={styles.forecastDataSection}>
            {/*<BsWind size={18} className="mr-1" />*/}
            <Text style={globalStyles.textSLightColor}>
              <Text style={globalFontWeight.light}>{t('Wind')}:</Text>{' '}
              {kmToMph(wind_kph, isFahrenheit)}
              {isFahrenheit ? t('WindSpeedMph') : t('WindSpeedKph')}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.forecastDataBottomSection}>
        {/*  <BsSunrise size={18} />*/}
        <Text style={[globalStyles.textSLightColor, globalFontWeight.light]}>
          {t('Rise')}:{' '}
          <Text style={globalFontWeight.bold}>
            {convertFrom12To24Format(sunrise, isFahrenheit)}
          </Text>
        </Text>
        <Text style={globalStyles.textSLightColor}>|</Text>
        {/*<BsArrowUp size={18} />*/}
        <Text style={[globalStyles.textSLightColor, globalFontWeight.light]}>
          {t('Max')}:{' '}
          <Text style={[globalFontWeight.bold]}>
            {celsiusToFahrenheit(maxtemp_c, isFahrenheit)}°
          </Text>
        </Text>
        <Text style={globalStyles.textSLightColor}>|</Text>
        {/*<BsArrowDown size={18} />*/}
        <Text style={[globalStyles.textSLightColor, globalFontWeight.light]}>
          {t('Min')}:{' '}
          <Text style={[globalFontWeight.bold]}>
            {celsiusToFahrenheit(mintemp_c, isFahrenheit)}°
          </Text>
        </Text>
        <Text style={globalStyles.textSLightColor}>|</Text>
        {/*<BsSunset size={18} />*/}
        <Text style={[globalStyles.textSLightColor, globalFontWeight.light]}>
          {t('Set')}:{' '}
          <Text style={[globalFontWeight.bold]}>
            {convertFrom12To24Format(sunset, isFahrenheit)}
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
    paddingVertical: 24,
    fontSize: 24,
    fontWeight: '200',
  },
  forecastSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  forecastDetailsSection: {
    flexDirection: 'column',
    marginVertical: 6,
  },
  forecastDataSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
  },
  forecastDataBottomSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
    paddingHorizontal: 8,
  },
});
