import {StyleSheet} from 'react-native';
export const globalTextColors = StyleSheet.create({
  lightColor: {
    color: '#fff',
  },
});

export const globalFontWeight = StyleSheet.create({
  light: {
    fontWeight: '300',
  },
  bold: {
    fontWeight: '500',
  },
  extraBold: {
    fontWeight: '600',
  },
});
export const globalStyles = StyleSheet.create({
  textSLightColor: {
    color: globalTextColors.lightColor.color,
    fontSize: 14,
    fontWeight: '500',
  },
  textMLightColor: {
    color: globalTextColors.lightColor.color,
    fontSize: 16,
    fontWeight: '500',
  },
  textLLightColor: {
    color: globalTextColors.lightColor.color,
    fontSize: 24,
    fontWeight: '500',
  },
  textXLLightColor: {
    color: globalTextColors.lightColor.color,
    fontSize: 48,
    fontWeight: '500',
  },
});
