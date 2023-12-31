import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { WeatherApi } from "../services/api/weatherApi";
import { WeatherType } from "../types/Types";


export const useWeather = (query: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [weather, setWeather] = useState<WeatherType>();
  const { t,  i18n: { language } } = useTranslation();

  useEffect(() => {
    setIsLoading(true);
    new WeatherApi()
      .setLang(language)
      .setCity(query)
      .fetch()
      .then((res) => {
        setWeather(res.data);
      })
      .catch((error) => {
        toast.error(t(error.message));
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, language]);

  return { isLoading, isError, weather };
};
