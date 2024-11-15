import {ActivityIndicator, SafeAreaView, StatusBar, StyleSheet, useColorScheme, View} from "react-native";
import React, {useEffect, useState} from "react";
import {useWeather} from "./hooks/useWeather";
import {useTranslation} from "react-i18next";
import {APP_MEASURE_UNITS} from "./consts/appMeasureUnits";
import {GetAppFavoriteListFromStorage} from "./services/appFavoriteList/getFavoriteListFromStorage";
import {GetAppMeasureUnitsFromStorage} from "./services/appMeasureUnits/getAppMeasureUnitsFromStorage";
import {GetAppLanguageFromStorage} from "./services/appLanguage/getAppLanguageFromStorage";
import {GeolocationPermission} from "./services/geolocation/geolocationPermission";
import {GetCordinates} from "./services/geolocation/getCordinates";
import DiagonalGradient from "./components/DiagonalGradient";
import {ScrollViewProvider} from "./components/ScrollViewProvider";
import TopButtons from "./components/TopButtons";
import InteractiveForm from "./components/InteractiveForm";
import {LastRefresh} from "./components/LastRefresh";
import {AddToFavorite} from "./components/AddToFavorite";
import {TimeAndLocation} from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forecast from "./components/Forecast";
import {globalHorizontalMargin, globalTextColors} from "./style/GlobalStyles";
import Footer from "./components/Footer";
import ToastManager from "toastify-react-native";

export default function App() {
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
