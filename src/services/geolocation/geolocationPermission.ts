import * as Location from 'expo-location';

type geolocationPermissionProps = {
  setLocationPermission: (value: string) => void;
};

export const GeolocationPermission = async ({setLocationPermission}: geolocationPermissionProps) => {
    const permission = await Location.requestForegroundPermissionsAsync()
    setLocationPermission( permission.status);
};
