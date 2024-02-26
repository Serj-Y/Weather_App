import {WeatherDataType} from '../types/Types';
import {formatToLocalTime} from '../helpers/formatToLocalTime.ts';
import {DateTime} from 'luxon';

export class WeatherFormattedData {
  private weather: WeatherDataType;

  constructor(weather: WeatherDataType) {
    this.weather = weather;
  }

  public currentWeather() {
    const {lat, lon, name, country, tz_id, localtime_epoch} =
      this.weather.location;
    const {
      temp_c,
      wind_kph,
      humidity,
      feelslike_c,
      condition: {text, icon},
    } = this.weather.current;
    const {forecastday} = this.weather.forecast;
    const {maxtemp_c, mintemp_c} = forecastday[0].day;
    const {sunrise, sunset} = forecastday[0].astro;
    return {
      lat,
      lon,
      name,
      temp_c,
      maxtemp_c,
      mintemp_c,
      wind_kph,
      humidity,
      feelslike_c,
      country,
      text,
      icon,
      localtime_epoch,
      tz_id,
      sunrise,
      sunset,
    };
  }

  public forecastWeather() {
    let {tz_id, forecast} = this.weather;
    const formatted = forecast.forecastday.map(d => {
      return {
        title: formatToLocalTime(d.date_epoch, tz_id, 'dd.MM '),
        temp: d.day.maxtemp_c,
        icon: d.day.condition.icon,
      };
    });
    return {dailyForecast: formatted};
  }
  public hourWeather() {
    let {forecast, location} = this.weather;
    const twoDaysHours = forecast.forecastday.flatMap(d => d.hour);

    const filtredTwoDaysHours = twoDaysHours.filter(
      f => f.time_epoch >= location.localtime_epoch,
    );
    const hourForecast = filtredTwoDaysHours
      .slice(0, 24)
      .map(({time_epoch, temp_c, condition: {icon}}) => ({
        title: DateTime.fromSeconds(time_epoch)
          .setZone(location.tz_id)
          .toFormat('hh:mm a'),
        temp: temp_c,
        icon,
      }));
    return {fiveHourForecast: hourForecast};
  }
}
