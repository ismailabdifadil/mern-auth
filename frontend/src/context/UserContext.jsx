import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const UserContext = createContext(null)

export const UserContextProvider = ({ children }) => {
  useEffect(() => {
    const storedUser = localStorage.getItem('userData')
    const expirationTime = localStorage.getItem('expirationTime')

    if (storedUser && expirationTime) {
      const currentTime = new Date().getTime()

      if (currentTime < parseInt(expirationTime)) {
        setUserData(JSON.parse(storedUser))
      } else {
        logout()
      }
    }
  }, [])

  const [userData, setUserData] = useState(null)
  function logout() {
    localStorage.removeItem('userData')
    localStorage.removeItem('expirationTime')
    setUserData(null)
  }

  const login = ({ data: { name, email, _id } }, expiresIn) => {
    const expirationTime = new Date().getTime() + expiresIn * 1000
    localStorage.setItem('userData', JSON.stringify({ name, email, id: _id }))
    localStorage.setItem('expirationTime', expirationTime.toString())
    console.log(name, email)
    setUserData({ name, email, _id })
  }

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  return useContext(UserContext)
}

export default UserContextProvider
