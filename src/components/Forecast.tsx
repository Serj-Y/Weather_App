import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  globalFontWeight,
  globalHorizontalMargin,
  globalStyles,
  globalVerticalMargin,
} from '../style/GlobalStyles.tsx';
import HrLine from './HrLine.tsx';
import {convertTime} from '../helpers/convertTime.ts';
import {convertTemperatureUnits} from '../helpers/convertTemperatureUnits.ts';
import {APP_MEASURE_UNITS} from '../consts/appMeasureUnits.ts';
import {GetAppLangForLuxon} from '../helpers/getCurrentLangForLuxon.ts';

type PropsType = {
  title: string;
  appMeasureUnit: APP_MEASURE_UNITS;
  items: Array<{
    title: string;
    icon: string;
    temp: number;
  }>;
};
const SCREEN_WIDTH = Dimensions.get('screen').width;
const ITEM_COUNT = 5;
export default function Forecast({title, items, appMeasureUnit}: PropsType) {
  const {t} = useTranslation();
  return (
    <>
      <View style={styles.mainTitle}>
        <Text style={globalStyles.textMLightColor}>
          {title} {t('Forecast')}
        </Text>
      </View>
      <HrLine />
      <FlatList
        data={items}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.forecastSection}
        renderItem={({item}) => (
          <View style={styles.item} key={item.title}>
            <Text
              style={[
                globalStyles.textSLightColor,
                globalFontWeight.light,
                {textTransform: 'capitalize'},
              ]}>
              {item.title.length > 6
                ? convertTime(item.title, appMeasureUnit, GetAppLangForLuxon())
                : item.title}
            </Text>
            <Image style={styles.image} source={{uri: `https:${item.icon}`}} />
            <Text style={[globalStyles.textSLightColor, globalFontWeight.bold]}>
              {convertTemperatureUnits(item.temp, appMeasureUnit)}
            </Text>
          </View>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  mainTitle: {
    marginTop: 24,
    marginHorizontal: globalHorizontalMargin.normal.marginHorizontal,
  },
  forecastSection: {
    flexGrow: 1,
    alignItems: 'center',
    marginVertical: globalVerticalMargin.normal.marginVertical,
    justifyContent: 'space-between',
  },
  item: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_WIDTH / ITEM_COUNT - ITEM_COUNT,
  },
  image: {
    width: 48,
    height: 48,
    margin: 4,
  },
});
