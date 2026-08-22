import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Language,
  MessageTier,
  TranslationKey,
  gameOverMessages,
  translations,
} from './translations';

const LANGUAGE_KEY = '@speed_math_language';

type Translate = (
  key: TranslationKey,
  params?: Record<string, string | number>
) => string;

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translate;
  messagesForTier: (tier: MessageTier) => string[];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const isLanguage = (value: string | null): value is Language =>
  value === 'en' || value === 'zh';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    AsyncStorage.getItem(LANGUAGE_KEY)
      .then((stored) => {
        if (isLanguage(stored)) {
          setLanguageState(stored);
        }
      })
      .catch((error) => console.warn('Failed to load language:', error));
  }, []);

  const setLanguage = (next: Language) => {
    setLanguageState(next);
    AsyncStorage.setItem(LANGUAGE_KEY, next).catch((error) =>
      console.warn('Failed to save language:', error)
    );
  };

  const t: Translate = (key, params) => {
    const template = translations[language][key];
    if (!params) return template;
    return Object.entries(params).reduce(
      (text, [name, value]) => text.split(`{${name}}`).join(String(value)),
      template
    );
  };

  const messagesForTier = (tier: MessageTier) => gameOverMessages[language][tier];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, messagesForTier }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
