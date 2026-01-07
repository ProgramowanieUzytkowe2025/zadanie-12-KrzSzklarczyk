import { createContext, useState } from 'react';

export const FontContext = createContext({
  czcionka: 'small',
  setCzcionka: () => {},
  czcionki: ['small', 'medium', 'large'],
});

export function FontProvider({ children }) {
  const [czcionka, setCzcionka] = useState('small');
  const czcionki = ['small', 'medium', 'large'];

  return (
    <FontContext.Provider value={{ czcionka, setCzcionka, czcionki }}>
      {children}
    </FontContext.Provider>
  );
}
