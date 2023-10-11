import { useEffect, useState } from 'react';

const Toggle = () => {
  const [isDark, setIsDark] = useState(() => {
    let state = '';
    try {
      const localData = localStorage.getItem('theme');
      state = localData === null ? 'light' : JSON.parse(localData);
    } catch (error) {
      console.error('error');
    }

    return state === 'dark';
  });

  const [mode, setMode] = useState('Light');

  function toggleTheme() {
    if (isDark) {
      document.querySelector('body')?.setAttribute('data-theme', 'dark');
      setMode('Dark');
      localStorage.setItem('theme', JSON.stringify('dark'));
    } else {
      document.querySelector('body')?.setAttribute('data-theme', 'light');
      setMode('Light');
      localStorage.setItem('theme', JSON.stringify('light'));
    }
  }

  useEffect(toggleTheme, [isDark]);

  return (
    <div id='toggle-box'>
      <label className='switch' htmlFor='toggle-btn'>
        <input type='checkbox' id='toggle-btn' checked={isDark} onChange={() => setIsDark(!isDark)}/>
        <span className='slider' />
      </label>
      <p>{mode} mode</p>
    </div>
  )
}

export default Toggle;