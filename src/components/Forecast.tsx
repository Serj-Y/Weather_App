import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  celsiusToFahrenheit,
  convertFrom12To24Format,
} from '../helpers/helpers.ts';

type PropsType = {
  title: string;
  isFahrenheit: boolean;
  items: Array<{
    title: string;
    icon: string;
    temp: number;
  }>;
};

export default function Forecast({title, items, isFahrenheit}: PropsType) {
  const {t} = useTranslation();
  return (
    <div>
      <div className="flex items-center justify-start mt-6">
        <p className="text-white font-medium uppercase">
          {title} {t('Forecast')}
        </p>
      </div>
      <hr className="my-2" />
      <div className="flex flex-grow items-center justify-between text-white">
        {items.map((item: {title: string; icon: string; temp: number}) => (
          <div
            key={item.title}
            className="flex flex-col items-center justify-center">
            <p className="font-light text-sm">
              {item.title.length > 6
                ? convertFrom12To24Format(item.title, isFahrenheit)
                : item.title}
            </p>
            <img className="w-12 my-2" src={item.icon} alt="forecastImg" />
            <p className="font-medium">
              {celsiusToFahrenheit(item.temp, isFahrenheit)}°
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
