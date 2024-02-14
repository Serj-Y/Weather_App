import React from 'react';
import {View} from 'react-native';
import {globalTextColors} from '../../Style/GlobalStyles.tsx';

export default function HrLine() {
  return (
    <View
      style={{
        height: 1,
        backgroundColor: globalTextColors.lightColor.color,
        alignSelf: 'stretch',
        marginVertical: 8,
      }}
    />
  );
}
