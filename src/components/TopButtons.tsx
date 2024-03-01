import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  globalFontWeight,
  globalHorizontalMargin,
  globalStyles,
} from '../style/GlobalStyles.tsx';
import PressableOpacity from './PressableOpacity';
import {HAPTIC_FEEDBACK, HapticFeedback} from '../utils/hapticFeedback.ts';
import {MAX_FAVORITE_LENGTH} from '../consts/appMinMaxLength.ts';
import {useTranslation} from 'react-i18next';

type TopButtonType = {
  setQuery: (value: string) => void;
  query: string;
  favorite: string[];
  cityName?: string;
};

export default function TopButtons({
  setQuery,
  favorite,
  cityName,
}: TopButtonType) {
  const {t} = useTranslation();
  function onCityPressHandler(city: string) {
    setQuery(city);
    HapticFeedback({feedbackType: HAPTIC_FEEDBACK.SUCCESS});
  }

  if (favorite?.length > 0) {
    return (
      <View style={styles.topButtons}>
        {favorite.map(city => (
          <View
            style={
              favorite.length < MAX_FAVORITE_LENGTH.THREE
                ? {}
                : styles.favoriteList
            }
            key={city}>
            <PressableOpacity
              onPress={() => onCityPressHandler(city)}
              disabled={city.trimEnd() === cityName?.trimEnd()}>
              <View>
                <Text
                  style={[globalStyles.textMLightColor, globalFontWeight.bold]}>
                  {city}
                </Text>
              </View>
            </PressableOpacity>
          </View>
        ))}
      </View>
    );
  } else {
    return (
      <View style={styles.placeHolder}>
        <Text
          style={[
            globalStyles.textSLightColor,
            globalFontWeight.light,
            {opacity: 0.5},
          ]}>
          {t('FavoriteListIsEmpty')}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topButtons: {
    maxHeight: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 6,
    marginHorizontal: globalHorizontalMargin.normal.marginHorizontal,
  },
  placeHolder: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
    marginHorizontal: globalHorizontalMargin.normal.marginHorizontal,
  },
  favoriteList: {
    maxWidth: '30%',
    flexWrap: 'nowrap',
    overflow: 'hidden',
  },
});
