import LinearGradient from 'react-native-linear-gradient';

function DiagonalGradient({children}: any) {
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
