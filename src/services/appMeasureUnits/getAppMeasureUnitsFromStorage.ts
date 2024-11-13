import {readingStoredStringData} from '../asyncStorage/readingStoredStringData';
import {APP_MEASURE_UNITS} from '../../consts/appMeasureUnits';

export const GetAppMeasureUnitsFromStorage = (
  setMeasureUnit: (value: APP_MEASURE_UNITS) => void,
) => {
  readingStoredStringData('AppMeasureUnits').then(res =>
    res
      ? setMeasureUnit(res as APP_MEASURE_UNITS)
      : setMeasureUnit(APP_MEASURE_UNITS.METRIC),
  );
};
