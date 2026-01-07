import { useCallback } from 'react';

const SESSION_KEY = 'kalkulator_historia';

export function useKalkulator({
  liczbaA,
  liczbaB,
  historia,
  setHistoria,
  setWynik,
  onCalculated,
}) {
  const aktualizujHistorie = useCallback(
    (operation, wynik) => {
      const nowaHistoria = [
        ...historia,
        { a: liczbaA, b: liczbaB, operation: operation, wynik: wynik },
      ];

      setHistoria(nowaHistoria);
      setWynik(wynik);

      sessionStorage.setItem(SESSION_KEY, JSON.stringify(nowaHistoria));

      if (typeof onCalculated === 'function') {
        onCalculated();
      }
    },
    [historia, liczbaA, liczbaB, setHistoria, setWynik, onCalculated]
  );

  const dodaj = useCallback(() => {
    aktualizujHistorie('+', liczbaA + liczbaB);
  }, [aktualizujHistorie, liczbaA, liczbaB]);

  const odejmij = useCallback(() => {
    aktualizujHistorie('-', liczbaA - liczbaB);
  }, [aktualizujHistorie, liczbaA, liczbaB]);

  const pomnoz = useCallback(() => {
    aktualizujHistorie('*', liczbaA * liczbaB);
  }, [aktualizujHistorie, liczbaA, liczbaB]);

  const podziel = useCallback(() => {
    if (liczbaB !== 0) {
      aktualizujHistorie('/', liczbaA / liczbaB);
    }
  }, [aktualizujHistorie, liczbaA, liczbaB]);

  return { dodaj, odejmij, pomnoz, podziel, aktualizujHistorie };
}
