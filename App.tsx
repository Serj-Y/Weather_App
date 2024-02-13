import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useWeather} from './src/hooks/useWeather.ts';
import Inputs from './src/components/Inputs.tsx';
import TopButtons from './src/components/TopButtons.tsx';
import TimeAndLocation from './src/components/TimeAndLocation.tsx';
// import {useTranslation} from 'react-i18next';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [query, setQuery] = useState('Kyiv');
  const [isFahrenheit, setFahrenheit] = useState(false);
  const {isLoading, weather} = useWeather(query);
  // const {t} = useTranslation();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  console.log(isLoading);
  console.log(weather);
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.mainContainer}>
        <View style={styles.appSection}>
          <TopButtons setQuery={setQuery} />
          <Inputs setQuery={setQuery} setFahrenheit={setFahrenheit} />
          {!isLoading && weather !== undefined ? (
            <TimeAndLocation weather={weather} isFahrenheit={isFahrenheit} />
          ) : (
            <View>
              <Text>{isLoading}</Text>
            </View>
          )}
        </View>
      </View>

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#04b7da',
  },
  appSection: {
    marginHorizontal: 6,
    backgroundColor: 'blur',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
