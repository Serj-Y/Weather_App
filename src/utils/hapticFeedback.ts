import {trigger} from 'react-native-haptic-feedback';

export enum HAPTIC_FEEDBACK {
  SUCCESS = 'notificationSuccess',
  ERROR = 'notificationError',
}

type HapticFeedbackProps = {
  feedbackType: HAPTIC_FEEDBACK;
};

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export const HapticFeedback = ({feedbackType}: HapticFeedbackProps) => {
  trigger(feedbackType, options);
};
