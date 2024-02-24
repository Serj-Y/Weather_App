import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
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
  // const [appMeasureUnit, setAppMeasureUnit] = useState(APP_MEASURE_UNITS.C);

  const handleSearchClick = () => {
    if (city !== '') {
      setQuery(city);
      setCity('');
    }
  };

  const handleGeolocationClick = () => {
    setIsLoading(true);
    GetCordinates({
      hasLocationPermission,
      setQuery,
      setIsLoading,
    });
  };

  const handleCelsiusClick = () => {
    Toast.success(t('TemperatureC'), 'top');
    setAppMeasureUnit(APP_MEASURE_UNITS.METRIC);
    storeStringData({key: 'AppMeasureUnits', value: APP_MEASURE_UNITS.METRIC});
  };

  const handleFahrenheitClick = () => {
    Toast.success(t('TemperatureF'), 'top');
    setAppMeasureUnit(APP_MEASURE_UNITS.IMPERIAL);
    storeStringData({
      key: 'AppMeasureUnits',
      value: APP_MEASURE_UNITS.IMPERIAL,
    });
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
          onEndEditing={handleSearchClick}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Icon
            name="search"
            size={18}
            color={globalTextColors.lightColor.color}
            onPress={handleSearchClick}
          />
        </TouchableOpacity>
        <TouchableOpacity disabled={isLoading} style={styles.geolocationButton}>
          <Icon
            name="map-pin"
            size={18}
            color={globalTextColors.lightColor.color}
            onPress={handleGeolocationClick}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.temperatureUnitSection}>
        <TouchableOpacity
          onPress={() => handleCelsiusClick()}
          disabled={appMeasureUnit === APP_MEASURE_UNITS.METRIC}>
          {appMeasureUnit === APP_MEASURE_UNITS.IMPERIAL ? (
            <Text style={globalStyles.textMLightColor}>°C </Text>
          ) : (
            <Text style={[globalStyles.textMLightColor, {opacity: 0.5}]}>
              °C
            </Text>
          )}
        </TouchableOpacity>
        <Text style={globalStyles.textMLightColor}>|</Text>
        <TouchableOpacity
          onPress={() => handleFahrenheitClick()}
          disabled={appMeasureUnit === APP_MEASURE_UNITS.IMPERIAL}>
          {appMeasureUnit === APP_MEASURE_UNITS.METRIC ? (
            <Text style={globalStyles.textMLightColor}>°F </Text>
          ) : (
            <Text style={[globalStyles.textMLightColor, {opacity: 0.5}]}>
              °F
            </Text>
          )}
        </TouchableOpacity>
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
  searchButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: globalHorizontalMargin.normal.marginHorizontal,
  },
  geolocationButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: globalHorizontalMargin.normal.marginHorizontal,
  },
  temperatureUnitSection: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
});
