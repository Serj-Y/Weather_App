import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
// import {GoSearch, GoLocation} from 'react-icons/go';
import {toast} from 'react-toastify';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';

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
          placeholder={t('Searchcity')}
          style={styles.input}
        />
        <View style={styles.searchButton}>
          <Button title={'Se'} onPress={handleSearchClick} />
        </View>
        <View style={styles.geolocationButton}>
          <Button title={'Ge'} onPress={() => {}} />
        </View>
      </View>
      <View style={styles.temperatureUnitSection}>
        <Button
          onPress={() => handleCelsiusClick()}
          title={'°C'}
          disabled={tempUnits === 'C'}
        />
        <Text>|</Text>
        <Button
          onPress={() => handleFahrenheitClick()}
          disabled={tempUnits === 'F'}
          title={'°F'}
        />
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
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '300',
    width: '70%',
    backgroundColor: '#fff',
    height: 36,
  },
  searchButton: {
    width: '15%',
  },
  geolocationButton: {
    width: '15%',
  },
  temperatureUnitSection: {
    flexDirection: 'row',
    width: '25%',
    justifyContent: 'space-between',
  },
});
