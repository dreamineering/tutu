import React, { FC, useEffect, useState } from 'react';

import { Switch } from 'antd';
import { useThemeSwitcher } from 'react-css-theme-switcher';

import { useEthersContext } from '@drmg/shared/ui';


// const initialTheme = window.localStorage.getItem('theme') ?? 'light';
const initialTheme = 'dark' ?? 'light';

export const ThemeSwitcher: FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(initialTheme === 'dark');
  const { switcher, currentTheme, status, themes } = useThemeSwitcher();
  const ethersContext = useEthersContext();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('You are on the browser');
      // ✅ Can use window here
      window.localStorage.setItem('theme', currentTheme ?? '');
      if (currentTheme === 'light' || currentTheme === 'dark') {
        ethersContext?.setModalTheme?.(currentTheme);
      }
    } else {
      console.log('You are on the server');
      // ⛔️ Don't use window here
    }
  }, [currentTheme]);

  const toggleTheme = (isChecked: boolean): void => {
    setIsDarkMode(isChecked);
    switcher({ theme: isChecked ? themes.dark : themes.light });
    ethersContext?.setModalTheme?.(isDarkMode ? 'dark' : 'light');
  };

  if (status === 'loading' || status === 'idle') {
    return <></>;
  }

  return (
    <div
      className="main fade-in"
      style={{ position: 'fixed', right: 10, bottom: 10 }}
    >
      <span style={{ padding: 8 }}>
        {currentTheme === 'light' ? '☀️' : '🌜'}
      </span>
      <Switch checked={isDarkMode} onChange={toggleTheme} />
    </div>
  );

  return null;
};
