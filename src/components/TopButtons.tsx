import React from 'react';
import {Button, StyleSheet, View} from 'react-native';

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
        <Button
          key={city.id}
          onPress={() => setQuery(city.title)}
          title={city.title}
        />
      ))}
    </View>
  );
}

// <div className="flex justify-between items-center my-6">

const styles = StyleSheet.create({
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
});
