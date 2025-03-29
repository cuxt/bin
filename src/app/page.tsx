import Image from 'next/image'

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="relative w-full max-w-md mx-auto overflow-hidden text-center">
          <div className="relative inline-block font-mono font-bold text-5xl md:text-6xl px-6 py-2">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              BIN
            </span>
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-400">
              API
            </span>

            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <div className="absolute w-12 h-12 rounded-full bg-yellow-300/20 -left-4 -top-4 animate-pulse"></div>
              <div className="absolute w-6 h-6 rounded-full bg-pink-400/20 right-8 top-0 animate-bounce"></div>
              <div className="absolute w-4 h-4 rounded-full bg-blue-400/20 right-4 bottom-2 animate-ping"></div>
            </div>

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
          </div>

          <div className="text-xs font-mono mt-1 text-gray-500 dark:text-gray-400 tracking-wider animate-pulse">
            &lt;/&gt; REST API Service
          </div>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="/api/reference"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            API Reference
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://docs.xbxin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://xbxin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to xbxin.com →
        </a>
      </footer>
    </div>
  )
}
