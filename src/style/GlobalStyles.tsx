import {StyleSheet} from 'react-native';
export const globalTextColors = StyleSheet.create({
  lightColor: {
    color: '#fff',
  },
});

export const globalVerticalMargin = StyleSheet.create({
  small: {
    marginVertical: 8,
  },
  normal: {
    marginVertical: 12,
  },
});
export const globalHorizontalMargin = StyleSheet.create({
  small: {
    marginHorizontal: 8,
  },
  normal: {
    marginHorizontal: 12,
  },
});

export const globalVerticalPadding = StyleSheet.create({
  small: {
    paddingVertical: 8,
  },
  normal: {
    paddingVertical: 12,
  },
});
export const globalHorizontalPadding = StyleSheet.create({
  small: {
    paddingHorizontal: 8,
  },
  normal: {
    paddingHorizontal: 12,
  },
});
export const globalFontWeight = StyleSheet.create({
  light: {
    fontWeight: '300',
  },
  normal: {
    fontWeight: '500',
  },
  bold: {
    fontWeight: '600',
  },
});
export const globalIconSize = StyleSheet.create({
  light: {
    width: 42,
    height: 42,
    color: globalTextColors.lightColor.color,
  },
});

export const globalStyles = StyleSheet.create({
  textSLightColor: {
    color: globalTextColors.lightColor.color,
    fontSize: 14,
  },
  textMLightColor: {
    color: globalTextColors.lightColor.color,
    fontSize: 16,
  },
  textLLightColor: {
    color: globalTextColors.lightColor.color,
    fontSize: 24,
  },
  textXLLightColor: {
    color: globalTextColors.lightColor.color,
    fontSize: 48,
  },
});
