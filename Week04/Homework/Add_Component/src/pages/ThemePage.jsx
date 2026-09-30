import { useState } from 'react';
import Theme from '../components/Theme';
import Panel from '../components/Panel';

export default function ThemePage() {
  const [dark, setDark] = useState(false);

  return (
    <div style={{
      background: dark ? '#0e0f0f' : 'white',
      color: dark ? '#dad6d6' : 'black',
      padding: '1rem',
      minHeight: '100%',
      transition: 'background 0.3s ease, color 0.3s ease',
    }}>
      <h1>Theme Toggle</h1>
      <p>A little sun/moon switch. Click it and see what happens</p>

      <Theme onChange={setDark} />

      <Panel style={{ background: dark ? '#0e0f0f' : 'white',
      color: dark ? '#dad6d6' : 'black', marginTop: '1.5rem', padding: '1rem' }}>
        <p>Current theme: <strong>{dark ? 'Dark 🌙' : 'Light ☀️'}</strong></p>
      </Panel>
    </div>
  );
}