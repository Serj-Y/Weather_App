import * as Haptics from 'expo-haptics';

export enum HAPTIC_FEEDBACK {
  SUCCESS = 'notificationSuccess',
  ERROR = 'notificationError',
}

type HapticFeedbackProps = {
  feedbackType: HAPTIC_FEEDBACK;
};

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: true,
};

export const HapticFeedback = ({feedbackType}: HapticFeedbackProps) => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  // trigger(feedbackType, options);
};
