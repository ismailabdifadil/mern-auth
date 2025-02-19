import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, createBrowserRouter, Route, Routes } from 'react-router'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import { RouterProvider } from 'react-router-dom'
import Hero from './components/Hero.jsx'
import { Toaster } from 'react-hot-toast'
import UserContextProvider from './context/UserContext.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Hero />,
      },
      {
        path: '/sign-up',
        element: <SignUp />,
      },
      {
        path: '/sign-in',
        element: <SignIn />,
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextProvider>
      <Toaster />
      <RouterProvider router={router} />
    </UserContextProvider>
  </StrictMode>
)
