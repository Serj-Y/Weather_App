import Icon from 'react-native-vector-icons/Feather';
import PressableOpacity from './PressableOpacity.tsx';
import {globalTextColors} from '../style/GlobalStyles.tsx';
import {Animated, View} from 'react-native';
import {storeObjectData} from '../services/asyncStorage/storeObjectData.ts';
import {HAPTIC_FEEDBACK, HapticFeedback} from '../utils/hapticFeedback.ts';
import {Toast} from 'toastify-react-native';
import {useTranslation} from 'react-i18next';
import {MAX_FAVORITE_LENGTH} from '../consts/appMinMaxLength.ts';
import delay = Animated.delay;

type AddToFavoriteProps = {
  city: string;
  setFavorite: React.Dispatch<React.SetStateAction<string[]>>;
  favorite: string[];
};

export const AddToFavorite = ({
  city,
  setFavorite,
  favorite,
}: AddToFavoriteProps) => {
  const {t} = useTranslation();
  function onFavoritePress(name: string) {
    if (favorite.length > 0 && favorite.includes(name)) {
      const deleteFromFavorite = favorite.filter(e => e !== name);
      setFavorite(deleteFromFavorite);
      storeObjectData({value: deleteFromFavorite, key: 'AppFavoriteList'});
    } else {
      if (favorite.length === MAX_FAVORITE_LENGTH.FOUR) {
        HapticFeedback({feedbackType: HAPTIC_FEEDBACK.ERROR});
        Toast.error(t('FavoriteListIsFull'), 'top');
        // Toast.error(t('ForCleanFavoriteListLongPressAddButton'), 'top');
      } else {
        const addToFavorite = [...favorite, name];
        setFavorite(addToFavorite);
        storeObjectData({value: addToFavorite, key: 'AppFavoriteList'});
      }
    }
  }
  function clearFavoriteList() {
    setFavorite([]);
    storeObjectData({value: [], key: 'AppFavoriteList'});
  }

  return (
    <View>
      <PressableOpacity
        onPress={() => onFavoritePress(city)}
        onLongPress={clearFavoriteList}>
        {favorite.length > 0 && favorite.includes(city) ? (
          <Icon
            color={globalTextColors.lightColor.color}
            size={20}
            name="x-square"
          />
        ) : (
          <Icon
            color={globalTextColors.lightColor.color}
            size={20}
            name="plus-square"
            style={[
              favorite.length === MAX_FAVORITE_LENGTH.FOUR
                ? {opacity: 0.5}
                : {},
            ]}
          />
        )}
      </PressableOpacity>
    </View>
  );
};
