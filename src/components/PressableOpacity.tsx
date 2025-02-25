import {StyleProp, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {globalHorizontalMargin} from '../style/GlobalStyles';

type PressableOpacityProps = {
  children: React.ReactNode;
  onPress: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<any>;
  key?: string;
};
function PressableOpacity({
  children,
  disabled,
  onPress,
  onLongPress,
  style,
}: PressableOpacityProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      onLongPress={onLongPress}
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
    padding:1.5,
  },
  defaultDisabledStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: globalHorizontalMargin.normal.marginHorizontal,
    opacity: 0.5,
    padding:1.5,
  },
});

export default PressableOpacity;
