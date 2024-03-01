import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {useWeather} from './src/hooks/useWeather.ts';
import InteractiveForm from './src/components/InteractiveForm.tsx';
import TopButtons from './src/components/TopButtons.tsx';
import {TimeAndLocation} from './src/components/TimeAndLocation.tsx';
import TemperatureAndDetails from './src/components/TemperatureAndDetails.tsx';
import Forecast from './src/components/Forecast.tsx';
import {useTranslation} from 'react-i18next';
import Footer from './src/components/Footer.tsx';
import ToastManager from 'toastify-react-native';
import DiagonalGradient from './src/components/DiagonalGradient.tsx';
import {
  globalHorizontalMargin,
  globalTextColors,
} from './src/style/GlobalStyles.tsx';
import {GeolocationPermission} from './src/services/geolocation/geolocationPermission.ts';
import {GetCordinates} from './src/services/geolocation/getCordinates.ts';
import {GetAppLanguageFromStorage} from './src/services/appLanguage/getAppLanguageFromStorage.ts';
import {APP_MEASURE_UNITS} from './src/consts/appMeasureUnits.ts';
import {GetAppMeasureUnitsFromStorage} from './src/services/appMeasureUnits/getAppMeasureUnitsFromStorage.ts';
import {LastRefresh} from './src/components/LastRefresh.tsx';
import {ScrollViewProvider} from './src/components/ScrollViewProvider.tsx';
import {AddToFavorite} from './src/components/AddToFavorite.tsx';
import {GetAppFavoriteListFromStorage} from './src/services/appFavoriteList/getFavoriteListFromStorage.ts';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [hasLocationPermission, setLocationPermission] = useState('');
  const {isLoading, weather, setIsLoading, setQuery, query} = useWeather();
  const [favorite, setFavorite] = useState<Array<string>>([]);
  const {t} = useTranslation();
  const [appMeasureUnit, setAppMeasureUnit] = useState<APP_MEASURE_UNITS>(
    APP_MEASURE_UNITS.METRIC,
  );

  useEffect(() => {
    GetAppFavoriteListFromStorage(setFavorite);
    GetAppMeasureUnitsFromStorage(setAppMeasureUnit);
    GetAppLanguageFromStorage();
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
        <ScrollViewProvider
          query={query}
          setIsLoading={setIsLoading}
          setQuery={setQuery}>
          <View style={styles.appSection}>
            <TopButtons
              query={query}
              setQuery={setQuery}
              favorite={favorite}
              cityName={weather?.name}
            />
            <InteractiveForm
              isLoading={isLoading}
              setQuery={setQuery}
              setIsLoading={setIsLoading}
              hasLocationPermission={hasLocationPermission}
              setAppMeasureUnit={setAppMeasureUnit}
              appMeasureUnit={appMeasureUnit}
            />
            {!isLoading && weather !== undefined ? (
              <>
                <View style={styles.lastUpdateAddToFavoriteSection}>
                  <View style={styles.placeholderView} />
                  <LastRefresh
                    lastUpdateInSeconds={weather.last_updated_epoch}
                  />
                  <AddToFavorite
                    city={weather.name}
                    favorite={favorite}
                    setFavorite={setFavorite}
                  />
                </View>

                <TimeAndLocation
                  weather={weather}
                  appMeasureUnit={appMeasureUnit}
                />
                <TemperatureAndDetails
                  weather={weather}
                  appMeasureUnit={appMeasureUnit}
                />
                <Forecast
                  appMeasureUnit={appMeasureUnit}
                  items={weather.fiveHourForecast}
                  title={t('Hourly')}
                />
                <Forecast
                  appMeasureUnit={appMeasureUnit}
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
        </ScrollViewProvider>
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
  descriptionSection: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  lastUpdateAddToFavoriteSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  placeholderView: {
    width: 20,
    marginRight: 20,
  },
  toast: {
    position: 'absolute',
    top: '3.5%',
    width: '100%',
  },
});

export default App;
