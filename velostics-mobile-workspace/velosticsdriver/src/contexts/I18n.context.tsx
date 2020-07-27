import React, { FC, useCallback, useContext, useEffect, useState } from "react";

import AsyncStorage from "@react-native-community/async-storage";
import { Text } from "@velostics/shared/src/uikit/text/Text";
import * as Localization from "expo-localization";
import { IntlProvider } from "react-intl";
import { observer } from "mobx-react-lite";

import translations from "../main/index.js";
import { AuthStoreContext } from "../stores/AuthStore";

const getTranslation = (locale: string) => {
  const lang = locale.split("-")[0];

  return translations[lang] ?? translations.en;
};

const ASYNC_STORAGE_LANGUAGE_KEY = "lang";
const DEFAULT_LOCALE = "en";

const LanguageContext = React.createContext({
  locale: DEFAULT_LOCALE,
  translation: getTranslation(DEFAULT_LOCALE),
  changeLocale: (locale: string) => {}
});

const LanguageProvider: FC = observer(({ children }) => {
  const [locale, setLocale] = useState<string>(DEFAULT_LOCALE);
  const [translation, setTranslation] = useState<string>(translations.en);

  const changeLocale = useCallback(newLanguage => {
    setLocale(newLanguage);
    setTranslation(getTranslation(newLanguage));

    AsyncStorage.setItem(ASYNC_STORAGE_LANGUAGE_KEY, newLanguage);
  }, []);

  useEffect(() => {
    AsyncStorage.getItem(ASYNC_STORAGE_LANGUAGE_KEY).then(saveLocale =>
      changeLocale(saveLocale ?? Localization.locale)
    );
  }, []);

  const { currentLanguage } = useContext(AuthStoreContext);

  useEffect(() => {
    changeLocale(currentLanguage);
  }, [currentLanguage]);

  const state = { locale, translation, changeLocale };

  // no idea why, without this the app crashes
  console.log(state);

  return (
    <LanguageContext.Provider value={state}>
      {children}
    </LanguageContext.Provider>
  );
});

export const useLanguageContext = () => useContext(LanguageContext);

export const useLanguage = () => useLanguageContext().locale;

const ContextAwareIntlProvider: FC = ({ children }) => {
  const { locale, translation } = useLanguageContext();

  return (
    <IntlProvider locale={locale} messages={translation} textComponent={Text}>
      {children}
    </IntlProvider>
  );
};

export const I18nProvider: FC = ({ children }) => {
  return (
    <LanguageProvider>
      <ContextAwareIntlProvider>{children}</ContextAwareIntlProvider>
    </LanguageProvider>
  );
};
