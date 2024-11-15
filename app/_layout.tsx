import { Stack } from "expo-router";
import '@/src/services/i18n/i18n';

export default function RootLayout() {
  return <Stack screenOptions={{
    headerShown: false,
  }}>
    <Stack.Screen name="index" />
  </Stack>;
}
