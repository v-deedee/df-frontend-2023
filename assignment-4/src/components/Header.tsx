import Toggle from './Toggle'

export default function Header() {
  return (
    <header className="py-3 px-2 lg:px-16 sm:px-8 bg-white dark:bg-zinc-700 flex justify-between">
      <h1 className="text-2xl sm:text-4xl font-bold">Bookstore</h1>
      <Toggle />
    </header>
  )
}
