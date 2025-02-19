import { Outlet } from 'react-router'
import Header from './components/Header'
import Hero from './components/Hero'

const App = () => {
  return (
    <div className=' h-svh'>
      <Header />
      <Outlet />
    </div>
  )
}

export default App
