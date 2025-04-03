import { AppProvider, useAppContext } from './AppContext'

const CountDisplay = () => {
   const { state} = useAppContext();
   return <p className='text-white'>{state.count}</p>
}

const CountButtons = () => {
   const { dispatch } = useAppContext();
   return (
      <div>
         <button className='rounded bg-violet-500 hover:bg-violet-700 focus:outline-0 focus:outline-offset-0 px-4 py-2 text-base text-white mx-1' onClick={() => dispatch({type: "increment"})}>Increment Count</button>
         <button className='rounded bg-violet-500 hover:bg-violet-700 px-4 py-2 text-base text-white' onClick={() => dispatch({type: "decrement"})}>Decrement Count</button>
      </div>
   )
}


function App() {
  return (
    <AppProvider>
        <div className='mx-auto max-w-7xl flex justify-center'>
          <CountDisplay />
          <CountButtons />
        </div>
    </AppProvider>
  )
}

export default App
