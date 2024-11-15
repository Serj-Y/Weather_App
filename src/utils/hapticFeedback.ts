import * as Haptics from 'expo-haptics';

export enum HAPTIC_FEEDBACK {
  SUCCESS = 'notificationSuccess',
  ERROR = 'notificationError',
}

type HapticFeedbackProps = {
  feedbackType: HAPTIC_FEEDBACK;
};

export const HapticFeedback = ({feedbackType}: HapticFeedbackProps) => {
  if(feedbackType === HAPTIC_FEEDBACK.SUCCESS){
    Haptics.notificationAsync( Haptics.NotificationFeedbackType.Success)
  } else if(feedbackType === HAPTIC_FEEDBACK.ERROR){
    Haptics.notificationAsync( Haptics.NotificationFeedbackType.Error)
  }
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
};
