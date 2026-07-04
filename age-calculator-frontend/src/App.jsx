import { useState } from 'react'
import NoiseBackground from './components/NoiseBackground.jsx'
import { getAge, API_BASE_URL } from './api.js'

function pad(value) {
  return String(value).padStart(2, '0')
}

const numberInputClasses =
  'cont h-[150px] rounded-2xl bg-white border-0 border-b-[8px] border-accent ' +
  'text-center text-5xl text-primary caret-transparent transition-colors duration-300 ' +
  'placeholder:text-4xl placeholder:text-muted focus:outline-none focus:bg-accent-soft ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 ' +
  '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ' +
  'w-full sm:w-[150px]'

function App() {
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [fieldError, setFieldError] = useState('')
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleCalculate() {
    if (!day || !month || !year) {
      setFieldError('Please fill in day, month, and year.')
      return
    }
    setFieldError('')

    const dob = `${year}-${pad(month)}-${pad(day)}`

    setLoading(true)
    try {
      const res = await getAge(dob)
      setResult(res.data)
      setError(null)
      setOpen(true)
    } catch (err) {
      let message = 'Something went wrong while calculating your age.'

      if (err.response) {
        message = err.response.data || `Request failed with status ${err.response.status}`
      } else if (err.request) {
        message = `Cannot reach ${API_BASE_URL} — is the backend running?`
      }

      setResult(null)
      setError(message)
      setOpen(true)
    } finally {
      setLoading(false)
    }
  }

  function handleClose() {
    setOpen(false)
  }

  return (
    <>
      <NoiseBackground />

      <main
        className={`flex min-h-[calc(100vh-40px)] flex-col items-center justify-center transition-[filter] duration-200 ${open ? 'blur-sm pointer-events-none' : ''
          }`}
      >
        <h1 className="m-2.5 text-center text-6xl leading-tight text-primary sm:text-[128px]">
          Age
          <br />
          Calculator
        </h1>

        <form
          className="mt-16 grid grid-cols-1 place-items-center gap-5 sm:grid-cols-3"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex w-full flex-col items-center sm:w-auto">
            <label htmlFor="day" className="sr-only">
              Day
            </label>
            <input
              type="number"
              className={numberInputClasses}
              name="day"
              id="day"
              placeholder="Day"
              min="1"
              max="31"
              required
              value={day}
              onChange={(e) => setDay(e.target.value)}
            />
          </div>
          <div className="flex w-full flex-col items-center sm:w-auto">
            <label htmlFor="month" className="sr-only">
              Month
            </label>
            <input
              type="number"
              className={numberInputClasses}
              name="month"
              id="month"
              placeholder="Month"
              min="1"
              max="12"
              required
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
          </div>
          <div className="flex w-full flex-col items-center sm:w-auto">
            <label htmlFor="year" className="sr-only">
              Year
            </label>
            <input
              type="number"
              className={numberInputClasses}
              name="year"
              id="year"
              placeholder="Year"
              min="1900"
              required
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
        </form>

        {fieldError && (
          <p role="alert" className="mt-4 text-center text-lg text-error">
            {fieldError}
          </p>
        )}

        <button
          type="button"
          className="my-[30px] h-[100px] w-[90%] max-w-[400px] rounded-2xl border-0 border-b-[8px] border-accent
            bg-accent-soft text-5xl text-primary transition-transform duration-200 hover:-translate-y-0.5
            disabled:translate-y-0 disabled:cursor-default disabled:opacity-70"
          onClick={handleCalculate}
          disabled={loading}
        >
          {loading ? 'Calculating...' : 'Calculate'}
        </button>

        <div
          aria-hidden="true"
          className="fixed -right-[400px] -top-[553px] -z-10 h-[1321px] w-[1321px]
            bg-[radial-gradient(50%_50%_at_50%_50%,#f0b94d_0%,#ffffff_100%)]"
        />
      </main>

      <div
        id="ansContainer"
        role="dialog"
        aria-label={error ? 'Error' : 'Age Result'}
        className={`fixed left-1/2 top-1/2 flex w-[85%] max-w-[500px] -translate-x-1/2 -translate-y-1/2
          flex-col items-center justify-center gap-5 rounded-2xl bg-white p-8 text-5xl text-primary
          shadow-[0_30px_80px_-20px_rgba(86,82,79,0.3)] sm:h-1/2 sm:w-1/2 ${open ? '' : 'hidden'}`}
      >
        <button
          id="x"
          aria-label="Close"
          onClick={handleClose}
          className={`absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full
            border-2 text-base transition-colors duration-300 hover:text-white ${error
              ? 'border-error text-error hover:bg-error'
              : 'border-accent text-accent hover:bg-accent'
            }`}
        >
          x
        </button>

        {error ? (
          <>
            <div
              aria-hidden="true"
              className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-error
                bg-error-soft text-4xl text-error"
            >
              !
            </div>
            <p className="text-3xl text-error sm:text-4xl">That date won't work</p>
            <p className="max-w-sm text-center text-xl text-primary sm:text-2xl" role="alert">
              {error}
            </p>
          </>
        ) : (
          <>
            <p className="text-3xl sm:text-5xl">You are</p>
            <div id="dyear" aria-label="Years" className="text-3xl sm:text-5xl">
              {result ? `${result.years} years` : ''}
            </div>
            <div id="dmonth" aria-label="Months" className="text-3xl sm:text-5xl">
              {result ? `${result.months} months` : ''}
            </div>
            <div id="ddate" aria-label="Days" className="text-3xl sm:text-5xl">
              {result ? `${result.days} days` : ''}
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default App
