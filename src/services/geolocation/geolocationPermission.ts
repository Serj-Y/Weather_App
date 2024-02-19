import Geolocation from 'react-native-geolocation-service';
import Platform, {PermissionsAndroid} from 'react-native';

type geolocationPermissionProps = {
  setLocationPermission: (value: string) => void;
};

export const GeolocationPermission = async ({
  setLocationPermission,
}: geolocationPermissionProps) => {
  const runOnPlatform = Platform.Platform.OS;
  if (runOnPlatform === 'ios') {
    const permission = await Geolocation.requestAuthorization('whenInUse');
    setLocationPermission(permission);
  } else {
    const permission = await PermissionsAndroid.request(
      'android.permission.ACCESS_FINE_LOCATION',
    );
    setLocationPermission(permission);
  }
};
