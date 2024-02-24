import LinearGradient from 'react-native-linear-gradient';
import React from 'react';

type DiagonalGradientProps = {
  children: React.ReactNode;
};
function DiagonalGradient({children}: DiagonalGradientProps) {
  return (
    <LinearGradient
      colors={['#06b5d4', '#0ea4e9', '#3b82f6']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={{flex: 1}}>
      {children}
    </LinearGradient>
  );
}

export default DiagonalGradient;
