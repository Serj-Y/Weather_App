import {readingStoredStringData} from '../asyncStorage/readingStoredStringData.ts';
import {APP_MEASURE_UNITS} from '../../consts/appMeasureUnits.ts';

export const GetAppMeasureUnitsFromStorage = (
  setMeasureUnit: (value: APP_MEASURE_UNITS) => void,
) => {
  readingStoredStringData('AppMeasureUnits').then(res =>
    res
      ? setMeasureUnit(res as APP_MEASURE_UNITS)
      : setMeasureUnit(APP_MEASURE_UNITS.METRIC),
  );
};
