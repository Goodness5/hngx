import React from 'react'
import { useTheme } from 'next-themes';

const Themetoggler = () => {
  const { theme, setTheme } = useTheme('dark');

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div>
        <button onClick={toggleTheme}>
            <img src={theme == 'dark' ? '/toggledark.svg': '/togglelight.svg'} alt="toggle" className="w-16" />
        </button>
    </div>
  )
}

export default Themetoggler