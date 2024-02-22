export const convertSpeedUnits = (kmh: number, isFahrenheit: boolean) => {
  const mph = kmh / 1.609344;
  if (isFahrenheit) {
    return mph.toFixed(1);
  } else {
    return kmh.toFixed(1);
  }
};
