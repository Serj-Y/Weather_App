import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {globalHorizontalMargin, globalStyles} from '../style/GlobalStyles.tsx';
import PressableOpacity from './PressableOpacity';
import {HAPTIC_FEEDBACK, HapticFeedback} from '../utils/hapticFeedback.ts';

type TopButtonType = {
  setQuery: (value: string) => void;
  query: string;
};

export default function TopButtons({setQuery, query}: TopButtonType) {
  const cites = [
    {
      id: '1',
      title: 'Kyiv',
    },
    {
      id: '2',
      title: 'London',
    },
    {
      id: '3',
      title: 'Milan',
    },
    {
      id: '4',
      title: 'Washington',
    },
  ];

  function onCityPressHandler(cityTitle: string) {
    setQuery(cityTitle);
    HapticFeedback({feedbackType: HAPTIC_FEEDBACK.SUCCESS});
  }

  return (
    <View style={styles.topButtons}>
      {cites.map(city => (
        <View key={city.id}>
          <PressableOpacity
            onPress={() => onCityPressHandler(city.title)}
            disabled={city.title === query.trim()}>
            <Text style={globalStyles.textMLightColor}>{city.title}</Text>
          </PressableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 6,
    marginHorizontal: globalHorizontalMargin.normal.marginHorizontal,
  },
});
