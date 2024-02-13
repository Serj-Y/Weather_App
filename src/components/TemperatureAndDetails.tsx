import React from 'react';
import {
  BsArrowUp,
  BsArrowDown,
  BsWind,
  BsSunset,
  BsSunrise,
} from 'react-icons/bs';
import {FaTemperatureHalf} from 'react-icons/fa6';
import {WiHumidity} from 'react-icons/wi';
import {useTranslation} from 'react-i18next';
import {
  celsiusToFahrenheit,
  convertFrom12To24Format,
  kmToMph,
} from '../helpers/helpers';

type PropsType = {
  weather: {
    icon: string;
    text: string;
    temp_c: number;
    feelslike_c: number;
    humidity: number;
    wind_kph: number;
    sunrise: string;
    sunset: string;
    maxtemp_c: number;
    mintemp_c: number;
  };
  isFahrenheit: boolean;
};

export default function TemperatureAndDetails({
  weather: {
    icon,
    text,
    feelslike_c,
    temp_c,
    humidity,
    wind_kph,
    sunrise,
    sunset,
    maxtemp_c,
    mintemp_c,
  },
  isFahrenheit,
}: PropsType) {
  const {t} = useTranslation();
  return (
    <div>
      <div className="flex items-center justify-center py-6 text-xl text-cyan-400">
        <p>{text}</p>
      </div>
      <div className="flex flex-row items-center justify-between text-white py-3">
        <img className="w-20" src={icon} alt="img" />
        <p className="text-5xl">{celsiusToFahrenheit(temp_c, isFahrenheit)}°</p>
        <div className="flex flex-col space-y-2">
          <div className="flex font-light text-sm items-center justify-center">
            <FaTemperatureHalf size={18} className="mr-1" />
            {t('Realfeel')}
            <span className="font-medium ml-1">
              {celsiusToFahrenheit(feelslike_c, isFahrenheit)}°
            </span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <WiHumidity size={18} className="mr-1" />
            {t('Humidity')}
            <span className="font-medium ml-1">{humidity}%</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <BsWind size={18} className="mr-1" />
            {t('Wind')}
            <span className="font-medium ml-1">
              {kmToMph(wind_kph, isFahrenheit)}{' '}
              {isFahrenheit ? t('WindSpeedMph') : t('WindSpeedKph')}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-2">
        <BsSunrise size={18} />
        <p className="font-light">
          {t('Rise')}{' '}
          <span className="font-medium ml-1 ">
            {' '}
            {convertFrom12To24Format(sunrise, isFahrenheit)}
          </span>
        </p>
        <p className="font-light">|</p>
        <BsArrowUp size={18} />
        <p className="font-light">
          {t('Max')}{' '}
          <span className="font-medium ml-1 ">
            {' '}
            {celsiusToFahrenheit(maxtemp_c, isFahrenheit)}°
          </span>
        </p>
        <p className="font-light">|</p>
        <BsArrowDown size={18} />
        <p className="font-light">
          {t('Min')}{' '}
          <span className="font-medium ml-1 ">
            {celsiusToFahrenheit(mintemp_c, isFahrenheit)}°
          </span>
        </p>
        <p className="font-light">|</p>
        <BsSunset size={18} />
        <p className="font-light">
          {t('Set')}{' '}
          <span className="font-medium ml-1 ">
            {' '}
            {convertFrom12To24Format(sunset, isFahrenheit)}
          </span>
        </p>
      </div>
    </div>
  );
}
