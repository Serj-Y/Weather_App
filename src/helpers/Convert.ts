import i18next from 'i18next';
import {APP_LANGUAGE} from '../consts/appLanguage';
import {APP_MEASURE_UNITS} from '../consts/appMeasureUnits';
import {DateTime} from 'luxon';


const localeForLuxon = () => {
        return i18next.language === APP_LANGUAGE.UA ? 'uk' : 'en';
    };

export const Convert = {

    speedFromKph: (kmh: number, appMeasureUnit: APP_MEASURE_UNITS) => {
        const mph = kmh / 1.609344;
        if (appMeasureUnit === APP_MEASURE_UNITS.IMPERIAL) {
            return mph.toFixed(1);
        } else {
            return kmh.toFixed(1);
        }
    },

    tempFromCelsius: (celsius: number, appMeasureUnit: APP_MEASURE_UNITS) => {
        if (appMeasureUnit === APP_MEASURE_UNITS.IMPERIAL) {
            const tempF = celsius * (9 / 5) + 32;
            return tempF.toFixed() + '°F';
        } else {
            return celsius.toFixed() + '°C';
        }
    },

    time12HTo24H: (time12: string, appMeasureUnit: APP_MEASURE_UNITS) => {
        const is12hour = appMeasureUnit === APP_MEASURE_UNITS.IMPERIAL;
        return DateTime.fromFormat(time12, 'hh:mm a')
            .setLocale(localeForLuxon())
            .toLocaleString({hour: '2-digit', minute: '2-digit', hour12: is12hour})
            .toUpperCase();
    },

    fromLocaltimeToFullDate: (localTimeEpoch: number, zone: string, ) => {
            return DateTime
                .fromSeconds(localTimeEpoch)
                .setZone(zone)
                .setLocale(localeForLuxon())
                .toLocaleString({year: 'numeric', weekday: 'long', month: 'short', day: '2-digit'});

    },

    fromDateEpochToDay: (dateEpoch: number, zone: string) => {
        return DateTime
            .fromSeconds(dateEpoch)
            .setZone(zone)
            .setLocale(localeForLuxon())
            .toLocaleString({weekday: 'short'});
    },

    fromLocaltimeEpochToHour:  (secs: number, zone?: string, appMeasureUnit?: string) => {
        const is12h = appMeasureUnit === APP_MEASURE_UNITS.IMPERIAL;
        return DateTime.fromSeconds(secs)
            .setZone(zone)
            .setLocale(localeForLuxon())
            .toLocaleString({hour: '2-digit', minute: '2-digit', hour12: is12h})
            .toUpperCase();
    },
};
