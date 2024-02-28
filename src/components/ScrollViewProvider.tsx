import {RefreshControl, ScrollView} from 'react-native';
import React from 'react';

type ScrollViewProviderProps = {
  children: React.ReactNode;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  query: string;
  setIsLoading: (value: boolean) => void;
};

export const ScrollViewProvider = ({
  setIsLoading,
  children,
  setQuery,
}: ScrollViewProviderProps) => {
  function refreshWeatherData() {
    setIsLoading(true);
    setQuery(prevState => prevState + ' ');
  }
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          colors={['transparent', 'transparent', 'transparent']}
          style={{
            backgroundColor: 'transparent',
            display: 'none',
            position: 'relative',
          }}
          progressBackgroundColor="transparent"
          refreshing={false}
          onRefresh={refreshWeatherData}
          tintColor={'transparent'}
          progressViewOffset={5000}
        />
      }
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
};
