import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {useWeather} from './src/hooks/useWeather.ts';
import InteractiveForm from './src/components/InteractiveForm.tsx';
import TopButtons from './src/components/TopButtons.tsx';
import TimeAndLocation from './src/components/TimeAndLocation.tsx';
import TemperatureAndDetails from './src/components/TemperatureAndDetails.tsx';
import Forecast from './src/components/Forecast.tsx';
import {useTranslation} from 'react-i18next';
import Footer from './src/components/Footer.tsx';
import ToastManager from 'toastify-react-native';
import DiagonalGradient from './src/components/DiagonalGradient.tsx';
import {
  globalHorizontalMargin,
  globalTextColors,
} from './src/Style/GlobalStyles.tsx';
import {GeolocationPermission} from './src/services/geolocation/geolocationPermission.ts';
import {GetCordinates} from './src/services/geolocation/getCordinates.ts';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [isFahrenheit, setFahrenheit] = useState(false);
  const [hasLocationPermission, setLocationPermission] = useState('');
  const {isLoading, weather, setIsLoading, setQuery} = useWeather();
  const {t} = useTranslation();

  useEffect(() => {
    GeolocationPermission({setLocationPermission}).then(() => {
      GetCordinates({
        hasLocationPermission,
        setQuery,
        setIsLoading,
      });
    });
  }, [hasLocationPermission, setIsLoading, setQuery]);

  return (
    <DiagonalGradient>
      <SafeAreaView style={styles.mainContainer}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={'transparent'}
          translucent={true}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}>
          <View style={styles.appSection}>
            <TopButtons setQuery={setQuery} />
            <InteractiveForm
              isLoading={isLoading}
              setQuery={setQuery}
              setFahrenheit={setFahrenheit}
              setIsLoading={setIsLoading}
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
                <ActivityIndicator
                  size="large"
                  color={globalTextColors.lightColor.color}
                />
              </View>
            )}
          </View>
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
    paddingTop: 44,
  },
  appSection: {
    minHeight: '100%',
    marginHorizontal: globalHorizontalMargin.normal.marginHorizontal,
    paddingBottom: 11,
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
