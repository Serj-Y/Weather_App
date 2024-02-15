import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {globalStyles} from '../Style/GlobalStyles.tsx';

type TopButtonType = {
  setQuery: (value: string) => void;
};

export default function TopButtons({setQuery}: TopButtonType) {
  const cites = [
    {
      id: 1,
      title: 'Kyiv',
    },
    {
      id: 2,
      title: 'London',
    },
    {
      id: 3,
      title: 'Milan',
    },
    {
      id: 4,
      title: 'Washington',
    },
  ];

  return (
    <View style={styles.topButtons}>
      {cites.map(city => (
        <TouchableOpacity key={city.id} onPress={() => setQuery(city.title)}>
          <Text style={globalStyles.textMLightColor}>{city.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 6,
    marginTop: 24,
  },
});
