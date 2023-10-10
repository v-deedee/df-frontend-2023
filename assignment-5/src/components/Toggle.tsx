import { useEffect, useState } from 'react'

const Toggle = () => {
  const [isDark, setIsDark] = useState(false)
  useEffect(() => {
    let state = ''
    const localData = localStorage.getItem('theme')
    try {
      state = localData === null ? 'light' : JSON.parse(localData)
    } catch (error) {
      console.error('error')
    }
    if (state === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    setIsDark(state === 'dark')
  }, [])

  const toggleMode = () => {
    if (!isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', JSON.stringify('dark'))
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', JSON.stringify('light'))
    }
    setIsDark(!isDark)
  }

  return (
    <div className="items-end md:mb-1 flex gap-1 sm:gap-3">
      <label
        className="relative inline-block w-9 h-2/3 sm:w-11 sm:h-6 cursor-pointer"
        htmlFor="toggle-btn"
      >
        <input
          type="checkbox"
          id="toggle-btn"
          className="w-0 h-0 opacity-0 peer"
          checked={isDark}
          onChange={toggleMode}
        />
        <span className="absolute top-0 right-0 bottom-0 left-0 bg-slate-400 transition rounded-3xl peer-checked:bg-red-400" />
        <span className="absolute h-3.5 sm:h-4 w-3.5 sm:w-4 left-1 bottom-1 bg-white transition rounded-full peer-checked:translate-x-3.5 sm:peer-checked:translate-x-5" />
      </label>
      <p className="font-bold sm:w-24">
        {isDark ? 'Dark' : 'Light'}
        <span className="hidden sm:inline"> mode</span>
      </p>
    </div>
  )
}

export default Toggle
