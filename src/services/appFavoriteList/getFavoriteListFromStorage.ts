import {readingStoredObjectData} from '../asyncStorage/readingStoredObjectData.ts';
import {Dispatch, SetStateAction} from 'react';

export const GetAppFavoriteListFromStorage = (
  setFavorite: Dispatch<SetStateAction<string[]>>,
) => {
  readingStoredObjectData('AppFavoriteList').then(res => {
    if (res) {
      setFavorite(res);
    }
  });
};
