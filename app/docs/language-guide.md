# FarmDirect Language System Guide

This document explains how to use the language system in the FarmDirect application to support multiple languages (currently English and Tamil).

## Overview

FarmDirect uses a React Context-based translation system that allows for easy switching between languages. All text content should be delivered through this system to ensure consistent language support.

## Key Components

1. **LanguageContext**: Context provider that manages the current language state
2. **translations.js**: Central file containing all translation strings
3. **useLanguage hook**: Used in components to access translations

## How to Use Translations in Components

### 1. Import the useLanguage hook

```jsx
import { useLanguage } from '../context/LanguageContext';
```

### 2. Use the hook to get translations

```jsx
const { t, language, changeLanguage } = useLanguage();
```

- `t`: Object containing all translations for the current language
- `language`: Current language code ('en' or 'ta')
- `changeLanguage`: Function to change the current language

### 3. Use translation keys in your JSX

```jsx
<h1>{t.welcome}</h1>
<p>{t.tagline}</p>
<button onClick={() => changeLanguage('ta')}>{t.tamil}</button>
```

## Adding New Translations

To add new text that needs translation:

1. Open `app/translations.js`
2. Add your translation keys to both language objects:

```js
export const translations = {
  en: {
    // Add your English text
    myNewFeature: "New Feature",
    // ...
  },
  ta: {
    // Add the Tamil translation
    myNewFeature: "புதிய அம்சம்",
    // ...
  }
};
```

## Best Practices

1. **Never hardcode text**: Always use translations even if you only support one language initially
2. **Use descriptive keys**: Create organized, semantic key names
3. **Keep translations organized**: Group related translations with comments
4. **Use consistent formatting**: Maintain the same structure for similar content
5. **Test both languages**: Ensure all components work properly in all supported languages

## Language Switching

The language can be switched using the language selector in the Header, or programmatically:

```jsx
const { changeLanguage } = useLanguage();

// To switch to Tamil
changeLanguage('ta');

// To switch to English
changeLanguage('en');
```

The selected language is stored in localStorage for persistence between sessions.

## Supported Languages

- English (en): Default language
- Tamil (ta): Secondary language

## Future Improvements

- Add more languages (Hindi, Telugu, etc.)
- Implement locale-specific date and number formatting
- Add RTL language support 