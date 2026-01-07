import './AppHeader.css';
import { useContext } from 'react';
import { FontContext } from './FontProvider';

export function AppHeader({ imie, nazwisko }) {
  const { czcionki, setCzcionka, czcionka } = useContext(FontContext);

  return (
    <div className="app-header">
      <h2>{imie} {nazwisko}</h2>
      <div className="app-header-czcionki">
        {czcionki.map(c => (
          <span
            key={c}
            title={c}
            onClick={() => setCzcionka(c)}
            style={{
              fontSize: c,
              fontWeight: czcionka === c ? '700' : '400',
              cursor: 'pointer',
              userSelect: 'none'
            }}
          >
            A
          </span>
        ))}
      </div>
    </div>
  );
}
