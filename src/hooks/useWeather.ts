import {useEffect, useState} from 'react';
import {WeatherApi} from '../services/api/weatherApi';
import {WeatherType} from '../types/Types';
import {Toast} from 'toastify-react-native';
import i18next from 'i18next';

export const useWeather = (query: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [weather, setWeather] = useState<WeatherType>();

  useEffect(() => {
    setIsLoading(true);
    new WeatherApi()
      .setCity(query)
      .fetch()
      .then(res => {
        setWeather(res?.data);
      })
      .catch(error => {
        Toast.error(i18next.t(error.message), 'top');
        console.log(error);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query]);

  return {isLoading, isError, weather};
};
