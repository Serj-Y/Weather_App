import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  celsiusToFahrenheit,
  convertFrom12To24Format,
} from '../helpers/helpers.ts';
import {Image, StyleSheet, Text, View} from 'react-native';
import {globalFontWeight, globalStyles} from '../Style/GlobalStyles.tsx';
import HrLine from '../helpers/ui/HrLine.tsx';

type PropsType = {
  title: string;
  isFahrenheit: boolean;
  items: Array<{
    title: string;
    icon: string;
    temp: number;
  }>;
};

export default function Forecast({title, items, isFahrenheit}: PropsType) {
  const {t} = useTranslation();
  return (
    <>
      <View style={styles.mainTitle}>
        <Text style={globalStyles.textMLightColor}>
          {title} {t('Forecast')}
        </Text>
      </View>
      <HrLine />
      <View style={styles.titleSection}>
        {items.map((item: {title: string; icon: string; temp: number}) => (
          <View style={styles.title} key={item.title}>
            <Text
              style={[globalStyles.textSLightColor, globalFontWeight.light]}>
              {item.title.length > 6
                ? convertFrom12To24Format(item.title, isFahrenheit)
                : item.title}
            </Text>
            <Image
              style={{width: 48, height: 48, margin: 4}}
              source={{uri: `https:${item.icon}`}}
            />
            <Text style={[globalStyles.textSLightColor, globalFontWeight.bold]}>
              {celsiusToFahrenheit(item.temp, isFahrenheit)}
            </Text>
          </View>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainTitle: {
    marginTop: 24,
  },
  titleSection: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
