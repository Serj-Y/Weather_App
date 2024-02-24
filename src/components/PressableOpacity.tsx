import {StyleProp, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {globalHorizontalMargin} from '../style/GlobalStyles.tsx';

type PressableOpacityProps = {
  children: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<TouchableOpacity | any>;
  key?: string;
};
function PressableOpacity({
  children,
  disabled,
  onPress,
  style,
}: PressableOpacityProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        disabled ? styles.defaultDisabledStyle : styles.defaultStyle,
        style,
      ]}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  defaultStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: globalHorizontalMargin.normal.marginHorizontal,
  },
  defaultDisabledStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: globalHorizontalMargin.normal.marginHorizontal,
    opacity: 0.5,
  },
});

export default PressableOpacity;
