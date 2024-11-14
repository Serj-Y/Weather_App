import React, {useEffect, useState} from 'react';
import {
    ActivityIndicator,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    useColorScheme,
    View,
} from 'react-native';
import {useWeather} from '@/src/hooks/useWeather';
import InteractiveForm from '@/src/components/InteractiveForm';
import TopButtons from '@/src/components/TopButtons';
import {TimeAndLocation} from '@/src/components/TimeAndLocation';
import TemperatureAndDetails from '@/src/components/TemperatureAndDetails';
import Forecast from '@/src/components/Forecast';
import {useTranslation} from 'react-i18next';
import Footer from '@/src/components/Footer';
import ToastManager from 'toastify-react-native';
import DiagonalGradient from '@/src/components/DiagonalGradient';
import {
    globalHorizontalMargin,
    globalTextColors,
} from '@/src/style/GlobalStyles';
import {GeolocationPermission} from '@/src/services/geolocation/geolocationPermission';
import {GetCordinates} from '@/src/services/geolocation/getCordinates';
import {GetAppLanguageFromStorage} from '@/src/services/appLanguage/getAppLanguageFromStorage';
import {APP_MEASURE_UNITS} from '@/src/consts/appMeasureUnits';
import {GetAppMeasureUnitsFromStorage} from '@/src/services/appMeasureUnits/getAppMeasureUnitsFromStorage';
import {LastRefresh} from '@/src/components/LastRefresh';
import {ScrollViewProvider} from '@/src/components/ScrollViewProvider';
import {AddToFavorite} from '@/src/components/AddToFavorite';
import {GetAppFavoriteListFromStorage} from '@/src/services/appFavoriteList/getFavoriteListFromStorage';

export default function Index() {
    const isDarkMode = useColorScheme() === 'dark';
    const [hasLocationPermission, setLocationPermission] = useState('');
    const {isLoading, weather, setIsLoading, setQuery, query} = useWeather();
    const [favorite, setFavorite] = useState<Array<string>>([]);
    const {t} = useTranslation();
    const [appMeasureUnit, setAppMeasureUnit] = useState<APP_MEASURE_UNITS>(
        APP_MEASURE_UNITS.METRIC
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
                            </>
                        ) : (
                            <View>
                                <ActivityIndicator
                                    size="large"
                                    color={globalTextColors.lightColor.color}
                                />

                            </View>
                        )}
                        <Footer />
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

// import { Image, StyleSheet, Platform } from 'react-native';
//
// import { HelloWave } from '@/components/HelloWave';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
//
// export default function HomeScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
//       headerImage={
//         <Image
//           source={require('@/assets/images/partial-react-logo.png')}
//           style={styles.reactLogo}
//         />
//       }>
//
//
//     </ParallaxScrollView>
//   );
// }
//
// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });
