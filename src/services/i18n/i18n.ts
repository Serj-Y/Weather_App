import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import {APP_LANGUAGE} from '../../consts/appLanguage.ts';

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  fallbackLng: APP_LANGUAGE.EN,
  resources: {
    en: {
      translation: {
        LocalTime: 'Local Time:',
        Realfeel: 'Real feel',
        Humidity: 'Humidity',
        Wind: 'Wind',
        WindSpeedKph: ' km/h',
        WindSpeedMph: ' mph',
        Rise: 'Rise:',
        Max: 'Max',
        Min: 'Min',
        Set: 'Set',

        Hourly: 'Hourly',
        Daily: 'Daily',
        NotFound: 'Not Found',
        CityNotFound: 'City Not Found',
        Weatherfor: 'Weather for',
        Loading: 'Loading...',
        ForecastForCurrentPosition: 'Forecast for current position',

        TemperatureC: 'Temperature in: Celsius',
        TemperatureF: 'Temperature in: Fahrenheit',
        Searchcity: 'Search for city...',

        Forecast: 'Forecast',

        AllRights: 'All Rights Reserved',
        ContactUs: 'Contact us',
        ChangeLang: 'Language Changed to: English',

        GeolocationFailed: 'Geolocation check failed...',

        Clear: 'Clear',
        Sunny: 'Sunny',
        Partlysunny: 'Partly Sunny',
        Mostlysunny: 'Mostly Sunny',
        Scatteredthunderstorms: 'ScatteredThunderstorms',
        Showers: 'Showers',
        Scatteredshowers: 'Scattered Showers',
        Rainandsnow: 'Rainand Snow',
        Overcast: 'Overcast',
        Lightsnow: 'Lightsnow',
        Freezingdrizzle: 'Freezing Drizzle',
        Chanceofrain: 'Chance of Rain',
        Partlycloudy: 'Partly Cloudy',
        PartlyCloudy: 'Partly Cloudy',
        Mostlycloudy: 'Mostly Cloudy',
        Chanceofstorm: 'Chance of Storm',
        Moderaterain: 'Moderate Rain',
        Rain: 'Rain',
        Chanceofsnow: 'Chance of Snow',
        Cloudy: 'Cloudy',
        Mist: 'Mist',
        Storm: 'Storm',
        Thunderstorm: 'Thunder Storm',
        Sleet: 'Sleet',
        Snow: 'Snow',
        Icy: 'Icy',
        Dust: 'Dust',
        Fog: 'Fog',
        Smoke: 'Smoke',
        Haze: 'Haze',
        Flurries: 'Flurries',
        Lightrain: 'Lightrain',
        Snowshowers: 'Snow Showers',
        Hail: 'Hail',
      },
    },
    ua: {
      translation: {
        LocalTime: 'Місцевий час:',
        Realfeel: 'Відчувається як',
        Humidity: 'Відносна вологість',
        Wind: 'Пориви вітру',
        WindSpeedKph: ' км/год',
        WindSpeedMph: ' міл/год',
        Rise: 'Схід',
        Max: 'Макс',
        Min: 'Мін',
        Set: 'Захід',

        Hourly: 'Погодинний',
        Daily: 'Поденный',
        NotFound: 'Не знайдено',
        CityNotFound: 'Місто не знайдено',
        Weatherfor: 'Прогноз для ',
        Loading: 'Завантаження...',
        ForecastForCurrentPosition: 'Прогноз на поточну позицію',

        TemperatureC: 'Температура в: Цельсиях',
        TemperatureF: 'Температура в: Фаренгейтах',
        Searchcity: 'Пошук міста...',

        Forecast: 'Прогноз',

        AllRights: 'Всі права захищені.',
        ContactUs: "Зв'яжіться з нами",
        ChangeLang: 'Мову змінено на: Українську',

        GeolocationFailed: 'Не вдалося перевірити геолокацію...',

        Clear: 'Ясно',
        Sunny: 'Сонячно',
        Partlysunny: 'Частково сонячно',
        Mostlysunny: 'В основному сонячно',
        Scatteredthunderstorms: 'Розсіяні грози',
        Showers: 'Дощі',
        Scatteredshowers: 'Розсіяні дощі',
        Rainandsnow: 'Дощ і сніг',
        Overcast: 'Хмарно',
        Lightsnow: 'Легкий сніг',
        Freezingdrizzle: 'Замерзаючий мряка',
        Chanceofrain: 'Ймовірність дощу',
        Partlycloudy: 'Частково хмарно',
        PartlyCloudy: 'Частково хмарно',
        Mostlycloudy: 'Переважно хмарно',
        Chanceofstorm: 'Ймовірність грози',
        Rain: 'Дощ',
        Moderaterain: 'Помірний дощ',
        Chanceofsnow: 'Ймовірність снігу',
        Cloudy: 'Хмарно',
        Mist: 'Туман',
        Storm: 'Шторм',
        Thunderstorm: 'Гроза',
        Sleet: 'Мокрий сніг',
        Snow: 'Сніг',
        Icy: 'Льодовики',
        Dust: 'Пил',
        Fog: 'Туман',
        Smoke: 'Дим',
        Haze: 'Мгла',
        Flurries: 'Хуртовини',
        Lightrain: 'Легкий дощ',
        Snowshowers: 'Снігопад',
        Hail: 'Град',
      },
    },
  },
});
