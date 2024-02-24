import {APP_MEASURE_UNITS} from '../consts/appMeasureUnits.ts';

export const convertSpeedUnits = (
  kmh: number,
  appMeasureUnit: APP_MEASURE_UNITS,
) => {
  const mph = kmh / 1.609344;
  if (appMeasureUnit === APP_MEASURE_UNITS.IMPERIAL) {
    return mph.toFixed(1);
  } else {
    return kmh.toFixed(1);
  }
};
