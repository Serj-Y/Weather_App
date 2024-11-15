import {Toast} from 'toastify-react-native';
import i18next from 'i18next';
import {HAPTIC_FEEDBACK, HapticFeedback} from '../../utils/hapticFeedback';
import * as Location from 'expo-location';
type GetCordinatesProps = {
  hasLocationPermission: string;
  setQuery: (value: string) => void;
  setIsLoading: (value: boolean) => void;
};

export const GetCordinates = ({
  hasLocationPermission,
  setQuery,
  setIsLoading,
}: GetCordinatesProps) => {

  setIsLoading(true);
  if (hasLocationPermission === 'granted') {
  Location.getCurrentPositionAsync().then((res) =>{
      const {latitude, longitude} = res.coords;
      const coordinate = `${latitude},${longitude}`;
    setQuery(coordinate);
    Toast.success(i18next.t('ForecastForCurrentPosition'));
    setIsLoading(false);
   }).catch((error) => {
    HapticFeedback({feedbackType: HAPTIC_FEEDBACK.ERROR});
    Toast.error(i18next.t('GeolocationFailed'), 'top');
    setIsLoading(false);
  })
  }
};
//  (position: { coords: { latitude: any; longitude: any; }; }) => {
//     const lat = position.coords.latitude;
//     const lon = position.coords.longitude;
//     const coordinate = `${lat},${lon}`;
//     setQuery(coordinate);
//     Toast.success(i18next.t('ForecastForCurrentPosition'));
//     setIsLoading(false);
//   },
//   error => {
//     HapticFeedback({feedbackType: HAPTIC_FEEDBACK.ERROR});
//     console.log(error.code, error.message);
//     Toast.error(i18next.t('GeolocationFailed'), 'top');
//     setIsLoading(false);
//   },
//   {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
// );
