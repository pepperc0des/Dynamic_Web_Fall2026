// useEffect uses [] because these document listeners are added once on mount.
// isDark ? 'dark' : 'light'; condition. depending on if isDark is true or false:
// the background color will be dark or light respectively
// I also synchronize the document's theme with a localstorage so the background-color applies 
// the entire document. This means it has no cleanup to do because it adds no listener

import { useEffect, useState } from 'react';

const trackStyle = (isDark) => ({
  display: 'inline-flex',
  alignItems: 'center',
  width: 64,
  height: 32,
  borderRadius: 999,
  background: isDark ? '#0e0f0f' : '#e2e4de',
  padding: 4,
  transition: 'background 0.3s ease',
});

const thumbStyle = (isDark) => ({
  width: 24,
  height: 24,
  borderRadius: '50%',
  background: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 14,
  transition: 'transform 0.3s ease',
  transform: isDark ? 'translateX(32px)' : 'translateX(0)',
});

export default function Theme({ onChange }) {
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    const theme = isDark ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [isDark]);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    onChange?.(next);
  }

  return (
    <button
      onClick={toggle}
      aria-pressed={isDark}
      aria-label="Toggle theme"
      style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
    >
      <span style={trackStyle(isDark)}>
        <span style={thumbStyle(isDark)}>{isDark ? '🌙' : '☀️'}</span>
      </span>
    </button>
  );
}