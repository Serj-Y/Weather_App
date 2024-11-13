// import Geolocation from 'react-native-geolocation-service';
import * as Location from 'expo-location';
import Platform from 'react-native';

type geolocationPermissionProps = {
  setLocationPermission: (value: string) => void;
};

export const GeolocationPermission = async ({
  setLocationPermission,
}: geolocationPermissionProps) => {
  const runOnPlatform = Platform.Platform.OS;
  if (runOnPlatform === 'ios') {
    const permission = await Location.requestForegroundPermissionsAsync()
    setLocationPermission( permission.status);
  } else {
    const permission = await Location.requestForegroundPermissionsAsync()
    setLocationPermission( permission.status);
  }
};
