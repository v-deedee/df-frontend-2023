import { useEffect, useState } from 'react';

const Toggle = () => {
  const [isDark, setIsDark] = useState(false);

  const [mode, setMode] = useState('Light');

  function toggleTheme() {
    if (isDark) {
      document.querySelector('body')?.setAttribute('data-theme', 'dark');
      setMode('Dark');
    } else {
      document.querySelector('body')?.setAttribute('data-theme', 'light');
      setMode('Light');
    }
  }

  useEffect(toggleTheme, [isDark]);

  return (
    <div id='toggle-box'>
      <label className='switch' htmlFor='toggle-btn'>
        <input type='checkbox' id='toggle-btn' checked={isDark} onClick={() => setIsDark(!isDark)}/>
        <span className='slider' />
      </label>
      <p>{mode} mode</p>
    </div>
  )
}

export default Toggle;