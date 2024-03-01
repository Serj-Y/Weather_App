import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {
  globalFontWeight,
  globalHorizontalMargin,
  globalStyles,
  globalTextColors,
} from '../style/GlobalStyles.tsx';
import Icon from 'react-native-vector-icons/Feather';
import {Toast} from 'toastify-react-native';
import {GetCordinates} from '../services/geolocation/getCordinates.ts';
import {storeStringData} from '../services/asyncStorage/storeStringData.ts';
import {APP_MEASURE_UNITS} from '../consts/appMeasureUnits.ts';
import PressableOpacity from './PressableOpacity.tsx';
import {HAPTIC_FEEDBACK, HapticFeedback} from '../utils/hapticFeedback.ts';
import {MIN_SEARCH_INPUT_LENGTH} from '../consts/appMinMaxLength.ts';

type PropsType = {
  setQuery: (city: string) => void;
  hasLocationPermission: string;
  setIsLoading: (value: boolean) => void;
  isLoading: boolean;
  appMeasureUnit: APP_MEASURE_UNITS;
  setAppMeasureUnit: (value: APP_MEASURE_UNITS) => void;
};

export default function InteractiveForm({
  setQuery,
  hasLocationPermission,
  setIsLoading,
  isLoading,
  appMeasureUnit,
  setAppMeasureUnit,
}: PropsType) {
  const {t} = useTranslation();
  const [city, setCity] = useState('');

  const handleSearchPress = () => {
    if (city.length >= MIN_SEARCH_INPUT_LENGTH.THREE) {
      setQuery(city);
      setCity('');
    }
  };

  const handleGeolocationPress = () => {
    setIsLoading(true);
    GetCordinates({
      hasLocationPermission,
      setQuery,
      setIsLoading,
    });
    HapticFeedback({feedbackType: HAPTIC_FEEDBACK.SUCCESS});
  };

  const handleCelsiusPress = () => {
    Toast.success(t('TemperatureC'), 'top');
    setAppMeasureUnit(APP_MEASURE_UNITS.METRIC);
    storeStringData({key: 'AppMeasureUnits', value: APP_MEASURE_UNITS.METRIC});
    HapticFeedback({feedbackType: HAPTIC_FEEDBACK.SUCCESS});
  };

  const handleFahrenheitPress = () => {
    Toast.success(t('TemperatureF'), 'top');
    setAppMeasureUnit(APP_MEASURE_UNITS.IMPERIAL);
    storeStringData({
      key: 'AppMeasureUnits',
      value: APP_MEASURE_UNITS.IMPERIAL,
    });
    HapticFeedback({feedbackType: HAPTIC_FEEDBACK.SUCCESS});
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputSection}>
        <TextInput
          value={city}
          onChangeText={setCity}
          placeholder={t('Searchcity')}
          style={styles.input}
          autoCapitalize={'words'}
          placeholderTextColor={globalTextColors.lightColor.color}
          onEndEditing={handleSearchPress}
        />
        <PressableOpacity
          onPress={handleSearchPress}
          disabled={isLoading || city.length < MIN_SEARCH_INPUT_LENGTH.THREE}>
          <Icon
            name="search"
            size={18}
            color={globalTextColors.lightColor.color}
          />
        </PressableOpacity>
        <PressableOpacity onPress={handleGeolocationPress} disabled={isLoading}>
          <Icon
            name="map-pin"
            size={18}
            color={globalTextColors.lightColor.color}
          />
        </PressableOpacity>
      </View>
      <View style={styles.temperatureUnitSection}>
        <PressableOpacity
          onPress={handleCelsiusPress}
          disabled={appMeasureUnit === APP_MEASURE_UNITS.METRIC}>
          <Text style={globalStyles.textMLightColor}>°C</Text>
        </PressableOpacity>
        <Text style={globalStyles.textMLightColor}>|</Text>
        <PressableOpacity
          onPress={handleFahrenheitPress}
          disabled={appMeasureUnit === APP_MEASURE_UNITS.IMPERIAL}>
          <Text style={globalStyles.textMLightColor}>°F</Text>
        </PressableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 22,
    marginHorizontal: globalHorizontalMargin.normal.marginHorizontal,
  },
  inputSection: {
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    fontSize: globalStyles.textMLightColor.fontSize,
    fontWeight: globalFontWeight.light.fontWeight,
    width: '70%',
    backgroundColor: 'transparent',
    color: globalTextColors.lightColor.color,
  },
  temperatureUnitSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
