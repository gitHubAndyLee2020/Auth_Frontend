import { useState, useMemo } from 'react'

//Create a login system that persists after reloading or rebooting of the application

import Registration from './components/Registration'
import Login from './components/Login'

function App() {
  const [counter, setCounter] = useState(0)

  return (
    <div>
      <Registration counter={counter} setCounter={setCounter} />
      <Login counter={counter} />      
    </div>
  )
}

export default App