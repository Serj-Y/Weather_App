import {useEffect, useState} from 'react';
import {WeatherApi} from '../services/api/weatherApi';
import {WeatherType} from '../types/Types';
import {useTranslation} from 'react-i18next';
import {Toast} from 'toastify-react-native';

export const useWeather = (query: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [weather, setWeather] = useState<WeatherType>();
  const {t} = useTranslation();

  useEffect(() => {
    setIsLoading(true);
    new WeatherApi()
      .setCity(query)
      .fetch()
      .then(res => {
        setWeather(res?.data);
      })
      .catch(error => {
        Toast.error(t(error.message), 'top');
        console.log(error);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return {isLoading, isError, weather};
};
