import {APP_MEASURE_UNITS} from '../consts/appMeasureUnits.ts';

export const convertTemperatureUnits = (
  celsius: number,
  appMeasureUnit: APP_MEASURE_UNITS,
) => {
  if (appMeasureUnit === APP_MEASURE_UNITS.IMPERIAL) {
    const tempF = celsius * (9 / 5) + 32;
    return tempF.toFixed() + '°F';
  } else {
    const tempC = celsius;
    return tempC.toFixed() + '°C';
  }
};
