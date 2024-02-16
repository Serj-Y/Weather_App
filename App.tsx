import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {useWeather} from './src/hooks/useWeather.ts';
import Inputs from './src/components/Inputs.tsx';
import TopButtons from './src/components/TopButtons.tsx';
import TimeAndLocation from './src/components/TimeAndLocation.tsx';
import TemperatureAndDetails from './src/components/TemperatureAndDetails.tsx';
import Forecast from './src/components/Forecast.tsx';
import {useTranslation} from 'react-i18next';
import Footer from './src/components/Footer.tsx';
import Geolocation from 'react-native-geolocation-service';
import ToastManager, {Toast} from 'toastify-react-native';
import DiagonalGradient from './src/helpers/ui/gradients/DiagonalGradient.tsx';
import {globalHorizontalMargin} from './src/Style/GlobalStyles.tsx';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [coordinates, setCoordinates] = useState('');
  const [query, setQuery] = useState(coordinates || 'Kyiv');
  const [isFahrenheit, setFahrenheit] = useState(false);
  const [hasLocationPermission, setLocationPermission] = useState('');
  const {isLoading, weather} = useWeather(query);
  const {t} = useTranslation();

  useEffect(() => {
    const hasPermission = async () => {
      const permission = await Geolocation.requestAuthorization('whenInUse');
      return setLocationPermission(permission);
    };
    hasPermission().then(() => {
      if (hasLocationPermission === 'granted') {
        Geolocation.getCurrentPosition(
          position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const coordinate = `${lat},${lon}`;
            setCoordinates(coordinate);
            setQuery(coordinate);
            Toast.success('Forecast for current position');
          },
          error => {
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  }, [hasLocationPermission]);

  return (
    <DiagonalGradient>
      <SafeAreaView style={styles.mainContainer}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={styles.mainContainer.backgroundColor}
        />

        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.mainContainer}>
          <View style={styles.appSection}>
            <TopButtons setQuery={setQuery} />
            <Inputs
              setQuery={setQuery}
              coordinates={coordinates}
              setFahrenheit={setFahrenheit}
              hasLocationPermission={hasLocationPermission}
            />
            {!isLoading && weather !== undefined ? (
              <>
                <TimeAndLocation
                  weather={weather}
                  isFahrenheit={isFahrenheit}
                />
                <TemperatureAndDetails
                  weather={weather}
                  isFahrenheit={isFahrenheit}
                />
                <Forecast
                  isFahrenheit={isFahrenheit}
                  items={weather.fiveHourForecast}
                  title={t('Hourly')}
                />
                <Forecast
                  isFahrenheit={isFahrenheit}
                  items={weather.dailyForecast}
                  title={t('Daily')}
                />
                <Footer />
              </>
            ) : (
              <View>
                <Text>{isLoading}</Text>
              </View>
            )}
          </View>
          <DiagonalGradient />
        </ScrollView>
        <ToastManager animationStyle={'rightInOut'} style={styles.toast} />
      </SafeAreaView>
    </DiagonalGradient>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  appSection: {
    minHeight: '100%',
    marginHorizontal: globalHorizontalMargin.normal.marginHorizontal,
    backgroundColor: 'blur',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  toast: {
    position: 'absolute',
    top: '3.5%',
    width: '100%',
  },
});

export default App;
