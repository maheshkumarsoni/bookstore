import BooksContainer from '@/components/BooksContainer';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-between min-h-screen min-h-[100dvh] relative overflow-hidden'>
      <header className='fixed top-0 z-10 flex items-center justify-between w-full gap-4 p-4 font-mono text-sm border-b border-gray-300 sm:px-6 sm:py-4 sm:gap-8 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:bg-gray-200 lg:dark:bg-zinc-800/30'>
        <p className='flex justify-center'>BookStore</p>
        <input
          type='text'
          className='flex-1 h-10 p-2 bg-transparent border-b-gray-300 dark:border-b-neutral-700'
          placeholder='Search Books...'
        />
        <div className='flex items-end justify-center'>Cart</div>
      </header>

      <div className='flex-1 w-full p-4 my-20 overflow-auto sm:px-6 sm:py-4'>
        <BooksContainer />
      </div>

      <footer className='fixed bottom-0 flex w-full p-4 text-center border-t border-gray-300 sm:px-6 sm:py-4 lg:text-right bg-gradient-to-t from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:bg-gray-200 lg:dark:bg-zinc-800/30'>
        <a
          href='https://github.com/maheshkumarsoni'
          className='w-full transition-colors group'
          target='_blank'
          rel='noopener noreferrer'>
          <p className={`text-sm opacity-50 group-hover:opacity-100`}>
            Created by MaheshKumar Soni ❤️
          </p>
        </a>
      </footer>
    </main>
  );
}
