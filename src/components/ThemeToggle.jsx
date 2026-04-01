import { Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import './ThemeToggle.css';

const THEME_KEY = 'resumeai_theme';

export function getInitialTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
  } catch {}
  return 'light';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="theme-toggle-track">
        <div className={`theme-toggle-thumb ${theme}`}>
          {theme === 'dark' ? <Moon size={12} /> : <Sun size={12} />}
        </div>
        <Sun size={10} className="theme-toggle-icon theme-toggle-icon--sun" />
        <Moon size={10} className="theme-toggle-icon theme-toggle-icon--moon" />
      </div>
    </button>
  );
}
