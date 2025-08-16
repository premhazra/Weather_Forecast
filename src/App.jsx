import { useState } from 'react'
import './App.css'
import search from './assets/icons/search.svg'
import { useStateContext } from './Context'
import { BackgroundLayout, WeatherCard, MiniCard } from './Components'

function App() {

  const [input, setInput] = useState('')
  const { weather, thisLocation, values, place, setPlace } = useStateContext()
  // console.log(weather)
  
  const submitCity = () => {
    setPlace(input)
    setInput('')
  }

  return (
    <div className="w-full min-h-screen text-white"> 
      {/* Single nav - removed duplicate */}
      <nav className="w-full px-4 py-3 flex items-center justify-between gap-5 sm:gap-4 md:gap-6">
        <h1
          aria-label="Weather Forecast"
          className="
            text-2xl sm:text-3xl lg:text-4xl
            font-extrabold leading-snug tracking-tight
            bg-gradient-to-r from-sky-400 via-indigo-400 to-fuchsia-500
            bg-clip-text text-transparent
            drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]
            transition-transform duration-300 will-change-transform
            hover:scale-[1.003]
            selection:bg-fuchsia-500/20
          "
        >
          WeatherForecast
        </h1>

        <form 
          onSubmit={(e) => { e.preventDefault(); submitCity(); }} 
          className="relative w-[11rem] xs:w-[13rem] sm:w-[18rem] md:w-[20rem]" 
          role="search" 
          aria-label="Search city"
        >
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
            <svg 
              className="h-[16px] w-[16px] text-slate-600" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
              <circle cx="10.5" cy="10.5" r="7.5" />
            </svg>
          </span>

          <input
            type="search"
            placeholder="Search city"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                submitCity();
              }
            }}
            className="
              w-full pl-9 pr-9 py-2 rounded-2xl
              text-slate-900 placeholder-slate-500 [caret-color:#0f172a]
              bg-white/90 ring-1 ring-black/10 hover:bg-white
              shadow-[0_8px_18px_rgba(0,0,0,0.12)]
              outline-none transition focus:ring-2 focus:ring-indigo-400
              [&:-webkit-autofill]:text-slate-900
              [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_rgba(255,255,255,0.95)]
            "
            aria-label="Search city"
          />

          {input && (
            <button
              type="button"
              onClick={() => setInput('')}
              aria-label="Clear search"
              className="absolute inset-y-0 right-1.5 my-auto h-8 w-8 grid place-items-center rounded-full text-slate-700 hover:bg-slate-200/50"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </form>
      </nav>
      <BackgroundLayout></BackgroundLayout>
      <main className='w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center'>
        <WeatherCard
          place={thisLocation}
          windspeed={weather.wspd}
          humidity={weather.humidity}
          temperature={weather.temp}
          heatIndex={weather.heatindex}
          iconString={weather.conditions}
          conditions={weather.conditions}
        />

        <div className='flex justify-center gap-8 flex-wrap w-[60%]'>
          {
            values?.slice(1, 7).map(curr => {
              return (
                <MiniCard
                  key={curr.datetime}
                  time={curr.datetime}
                  temp={curr.temp}
                  iconString={curr.conditions}
                />
              )
            })
          }
        </div>
      </main>
    </div>
  )
}

export default App
