import React from 'react';
import {View} from 'react-native';
import {
  globalHorizontalMargin,
  globalTextColors,
} from '../style/GlobalStyles.tsx';

export default function HrLine() {
  return (
    <View
      style={{
        height: 1,
        backgroundColor: globalTextColors.lightColor.color,
        alignSelf: 'stretch',
        marginHorizontal: globalHorizontalMargin.normal.marginHorizontal,
      }}
    />
  );
}
