import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {toast} from 'react-toastify';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {globalStyles, globalTextColors} from '../Style/GlobalStyles.tsx';
import Icon from 'react-native-vector-icons/Feather';

type PropsType = {
  setFahrenheit: (value: boolean) => void;
  setQuery: (city: string) => void;
};

export default function Inputs({setQuery, setFahrenheit}: PropsType) {
  const {t} = useTranslation();
  const [city, setCity] = useState('');
  const [tempUnits, setTempUnits] = useState('C');
  const handleSearchClick = () => {
    if (city !== '') {
      setQuery(city);
      setCity('');
    }
  };

  // const handleLocationClick = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(position => {
  //       const lat = position.coords.latitude.toString().slice(0, 6);
  //       const lon = position.coords.longitude.toString().slice(0, 6);
  //       const coordinate = `${lat},${lon}`;
  //
  //       setQuery(coordinate);
  //     });
  //   }
  // };

  const handleCelsiusClick = () => {
    setFahrenheit(false);
    toast.info(t('TemperatureC'));
    setTempUnits('C');
  };

  const handleFahrenheitClick = () => {
    setFahrenheit(true);
    toast.info(t('TemperatureF'));
    setTempUnits('F');
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputSection}>
        <TextInput
          value={city}
          onChangeText={value => setCity(value)}
          placeholder={t('City')}
          style={styles.input}
          autoCapitalize={'words'}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Icon
            name="search"
            size={18}
            color={globalTextColors.lightColor.color}
            onPress={handleSearchClick}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.geolocationButton}>
          <Icon
            name="map-pin"
            size={18}
            color={globalTextColors.lightColor.color}
            onPress={() => {}}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.temperatureUnitSection}>
        <TouchableOpacity
          onPress={() => handleCelsiusClick()}
          disabled={tempUnits === 'C'}>
          <Text style={globalStyles.textMLightColor}>°C </Text>
        </TouchableOpacity>
        <Text style={globalStyles.textMLightColor}>|</Text>
        <TouchableOpacity
          onPress={() => handleFahrenheitClick()}
          disabled={tempUnits === 'F'}>
          <Text style={globalStyles.textMLightColor}>°F</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
    marginHorizontal: 8,
  },
  inputSection: {
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    fontSize: globalStyles.textLLightColor.fontSize,
    lineHeight: 28,
    fontWeight: globalStyles.textLLightColor.fontWeight,
    width: '70%',
    backgroundColor: globalStyles.textLLightColor.color,
    height: 36,
    marginRight: 8,
  },
  searchButton: {
    width: '15%',
    justifyContent: 'center',
  },
  geolocationButton: {
    width: '15%',
    justifyContent: 'center',
  },
  temperatureUnitSection: {
    flexDirection: 'row',
    width: '25%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
