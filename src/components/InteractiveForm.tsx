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
} from '../Style/GlobalStyles.tsx';
import Icon from 'react-native-vector-icons/Feather';
import {Toast} from 'toastify-react-native';
import {GetCordinates} from '../services/geolocation/getCordinates.ts';

type PropsType = {
  setFahrenheit: (value: boolean) => void;
  setQuery: (city: string) => void;
  hasLocationPermission: string;
  setIsLoading: (value: boolean) => void;
  isLoading: boolean;
};

export default function InteractiveForm({
  setQuery,
  setFahrenheit,
  hasLocationPermission,
  setIsLoading,
  isLoading,
}: PropsType) {
  const {t} = useTranslation();
  const [city, setCity] = useState('');
  const [tempUnits, setTempUnits] = useState('C');

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
    setFahrenheit(false);
    Toast.success(t('TemperatureC'), 'top');
    setTempUnits('C');
  };

  const handleFahrenheitClick = () => {
    setFahrenheit(true);
    Toast.success(t('TemperatureF'), 'top');
    setTempUnits('F');
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
          disabled={tempUnits === 'C'}>
          {tempUnits === 'F' ? (
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
          disabled={tempUnits === 'F'}>
          {tempUnits === 'C' ? (
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
