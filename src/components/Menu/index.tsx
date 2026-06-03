import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon } from 'lucide-react';
import styles from './styles.module.css';
import { useState , useEffect} from 'react';
import { RouterLink } from '../RouterLink';

type AvailableThemes = 'dark' | 'light';

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const savedTheme = localStorage.getItem('theme') as AvailableThemes | null;
    return savedTheme || 'dark';
  });

  const nextThemeIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />
  }

  function handleThemeChange(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  }
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return(
  <nav className={styles.menu}>
    <RouterLink href="/" className={styles.menuLink} aria-label='Ir para a home' title='Ir para a home'>
      <HouseIcon />
    </RouterLink>
    <RouterLink href="#" className={styles.menuLink} aria-label='Ver histórico' title='Ver histórico'>
      <HistoryIcon />
    </RouterLink>
    <RouterLink href="#" className={styles.menuLink} aria-label='Configurções' title='Configurções'>
      <SettingsIcon />
    </RouterLink>
    <a href="#" className={styles.menuLink} aria-label='Mudar tema' title='Mudar tema' onClick={handleThemeChange}>
      {nextThemeIcon[theme]}
    </a>
  </nav>

  )
}
