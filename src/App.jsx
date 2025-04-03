import { AppProvider, useAppContext } from './AppContext'

const CountDisplay = () => {
   const { state} = useAppContext();
   return <p className='text-white'>{state.count}</p>
}

const CountButtons = () => {
   const { dispatch } = useAppContext();
   return (
      <div>
         <button className='bg-white' onClick={() => dispatch({type: "increment"})}>Increment Count</button>
         <button className='bg-white' onClick={() => dispatch({type: "decrement"})}>Decrement Count</button>
      </div>
   )
}


function App() {
  return (
    <AppProvider>
        <CountDisplay />
        <CountButtons />
    </AppProvider>
  )
}

export default App
