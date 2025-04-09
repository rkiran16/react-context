import { createContext, useReducer, useContext } from 'react';

const AppContext = createContext(null);


function appReducer(state,action) {
    switch(action.type) {
        case "increment": {
            return {
                ...state,
                count: state.count + 1
            }
        }
        case 'decrement': {
            return {
                ...state,
                count: state.count - 1
            }
        }
        default: {
           throw new Error(`Unhandled action type: ${action.type}`)
        } 
    }
}


function AppProvider({children}) {
    const [state, dispatch] = useReducer(appReducer, { count : 0})
    const value = {state, dispatch}

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppProvider')
  }
  return context
}

export { AppProvider, useAppContext}