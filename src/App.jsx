import './App.css';
import { AppCalculator } from './AppCalculator';
import { AppHeader } from './AppHeader';
import { useContext } from 'react';
import { FontContext } from './FontProvider';

export default function App() {
  const { czcionka } = useContext(FontContext);

  return (
    <div className="app" style={{ fontSize: czcionka }}>
      <div>
        <AppHeader imie={'Imię'} nazwisko={'Nazwisko'} />
      </div>
      <div>
        <AppCalculator />
      </div>
    </div>
  );
}
