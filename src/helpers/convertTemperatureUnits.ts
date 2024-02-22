export const convertTemperatureUnits = (
  celsius: number,
  isFahrenheit: boolean,
) => {
  if (isFahrenheit) {
    const tempF = celsius * (9 / 5) + 32;
    return tempF.toFixed() + '°F';
  } else {
    const tempC = celsius;
    return tempC.toFixed() + '°C';
  }
};
