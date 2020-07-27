import Config from 'react-native-config';

export default {
  IS_PRODUCTION: Config.IS_PRODUCTION,
  API_HOST: Config.API_HOST,
  TARGET_NAME: Config.TARGET_NAME,
  VERSION: Config.VERSION,
  CODE_PUSH_IOS: Config.CODE_PUSH_IOS,
  CODE_PUSH_ANDROID: Config.CODE_PUSH_ANDROID,
  SENTRY: Config.SENTRY
};
