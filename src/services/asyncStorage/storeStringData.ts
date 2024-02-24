import AsyncStorage from '@react-native-async-storage/async-storage';
import {APP_MEASURE_UNITS} from '../../consts/appMeasureUnits.ts';

type StoreStringDataProps = {
  key: string;
  value: APP_MEASURE_UNITS;
};

export const storeStringData = async ({key, value}: StoreStringDataProps) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
    console.log(e);
  }
};
