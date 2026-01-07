import './AppCalculator.css';
import { useEffect, useReducer, useState } from 'react';
import { AppButton } from './AppButton';
import { AppCalculationHistory } from './AppCalculationHistory';
import { useKalkulator } from './useKalkulator';
import {
  calculatorStatusReducer,
  STATUS,
  STATUS_ACTIONS,
} from './calculatorStatusReducer';

const SESSION_KEY = 'kalkulator_historia';

export function AppCalculator() {
  const [liczbaA, setLiczbaA] = useState(null);
  const [liczbaB, setLiczbaB] = useState(null);
  const [wynik, setWynik] = useState(null);
  const [historia, setHistoria] = useState([]);
  const [porownanie, setPorownanie] = useState('');

  const [status, dispatchStatus] = useReducer(
    calculatorStatusReducer,
    STATUS.BRAK
  );

  useEffect(() => {
    try {
      const zapis = sessionStorage.getItem(SESSION_KEY);
      if (!zapis) return;

      const wczytanaHistoria = JSON.parse(zapis);
      if (!Array.isArray(wczytanaHistoria) || wczytanaHistoria.length === 0) return;

      setHistoria(wczytanaHistoria);

      const ostatni = wczytanaHistoria[wczytanaHistoria.length - 1];
      setLiczbaA(ostatni.a);
      setLiczbaB(ostatni.b);
      setWynik(ostatni.wynik);

    } catch (e) {}
  }, []);

  useEffect(() => {
    const zablokujPrzyciski = liczbaA == null || liczbaB == null;

    let nextPorownanie = '';
    if (!zablokujPrzyciski) {
      if (liczbaA === liczbaB) nextPorownanie = 'Liczba A jest równa liczbie B.';
      else if (liczbaA > liczbaB) nextPorownanie = 'Liczba A jest większa od liczby B.';
      else nextPorownanie = 'Liczba B jest większa od liczby A.';
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPorownanie(nextPorownanie);
  }, [liczbaA, liczbaB]);

  const { dodaj, odejmij, pomnoz, podziel } = useKalkulator({
    liczbaA,
    liczbaB,
    historia,
    setHistoria,
    setWynik,
    onCalculated: () => dispatchStatus({ type: STATUS_ACTIONS.CALCULATED }),
  });

  function parsujLiczbe(value) {
    const sparsowanaLiczba = parseFloat(value);
    if (isNaN(sparsowanaLiczba)) return null;
    return sparsowanaLiczba;
  }

  function liczbaAOnChange(value) {
    setLiczbaA(parsujLiczbe(value));
    dispatchStatus({ type: STATUS_ACTIONS.MODIFIED_A });
  }

  function liczbaBOnChange(value) {
    setLiczbaB(parsujLiczbe(value));
    dispatchStatus({ type: STATUS_ACTIONS.MODIFIED_B });
  }

  function onAppCalculationHistoryClick(index) {
    const nowaHistoria = historia.slice(0, index + 1);
    setHistoria(nowaHistoria);

    const wpis = historia[index];
    setLiczbaA(wpis.a);
    setLiczbaB(wpis.b);
    setWynik(wpis.wynik);

    sessionStorage.setItem(SESSION_KEY, JSON.stringify(nowaHistoria));

    dispatchStatus({ type: STATUS_ACTIONS.RESTORED });
  }

  const zablokujPrzyciski = liczbaA == null || liczbaB == null;
  const zablokujDzielenie = zablokujPrzyciski || liczbaB === 0;

  return (
    <div className='app-calculator'>
      <div className='app-calculator-pole'>
        <label>Wynik: </label>
        <span>{wynik}</span>
      </div>

      <hr />

      {}
      <div className='app-calculator-pole'>
        <label>Ostatnia czynność: </label>
        <span>{status}</span>
      </div>

      <hr />

      <div className='app-calculator-pole'>
        <label>Dynamiczne porównanie liczb: </label>
        <span>{porownanie}</span>
      </div>

      <hr />

      <div className='app-calculator-pole'>
        <label htmlFor="liczba1">Liczba 1</label>
        <input
          id="liczba1"
          type="number"
          value={liczbaA ?? ''}
          onChange={(e) => liczbaAOnChange(e.target.value)}
          name="liczba1"
        />
      </div>

      <div className='app-calculator-pole'>
        <label htmlFor="liczba2">Liczba 2</label>
        <input
          id="liczba2"
          type="number"
          value={liczbaB ?? ''}
          onChange={(e) => liczbaBOnChange(e.target.value)}
          name="liczba2"
        />
      </div>

      <hr />

      <div className='app-calculator-przyciski'>
        <AppButton disabled={zablokujPrzyciski} title="+" onClick={() => dodaj()} />
        <AppButton disabled={zablokujPrzyciski} title="-" onClick={() => odejmij()} />
        <AppButton disabled={zablokujPrzyciski} title="*" onClick={() => pomnoz()} />
        <AppButton disabled={zablokujDzielenie} title="/" onClick={() => podziel()} />
      </div>

      <hr />

      <div className='app-calculator-historia'>
        <AppCalculationHistory
          historia={historia}
          onClick={(index) => onAppCalculationHistoryClick(index)}
        />
      </div>
    </div>
  );
}
