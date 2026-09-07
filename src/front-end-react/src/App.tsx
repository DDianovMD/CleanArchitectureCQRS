import { Outlet, useLocation } from 'react-router-dom'
import './App.css'

function App() {
  const location = useLocation();

  return (
    <>
      <nav></nav>
      <main>
        {
          location && location.pathname === '/'
            ? <div>Simple front end application for demo purposes.</div>
            : <Outlet />
        }
      </main>
      <footer></footer>
    </>
  )
}

export default App
