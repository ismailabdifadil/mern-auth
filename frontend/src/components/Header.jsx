import { Link, useNavigate } from 'react-router'
import { useUser } from '../context/UserContext'

const Header = () => {
  const { userData, logout } = useUser()
  const navigate = useNavigate()

  return (
    <header className='h-24  py-6 w-full shadow  px-4 bg-white'>
      <nav className='flex items-center justify-between max-w-5xl m-auto '>
        <div className='flex items-center '>
          <Link to='/'>
            <img src='/images/logo.png' alt='Logo' width={60} />
          </Link>
          <span className='font-semibold text-lg md:text-3xl hidden md:block'>
            MERN AUTH
          </span>
        </div>
        {userData?.name ? (
          <div className='flex space-x-3 items-center'>
            <p>
              Hi,👍{' '}
              <span className='font-bold text-lg text-slate-800'>
                {userData?.name.at(0).toUpperCase() + userData?.name.slice(1)}
              </span>
            </p>
          </div>
        ) : (
          <Link
            to='/sign-in'
            className='border px-6 py-2 rounded-lg  hover:bg-slate-900 hover:text-white transition cursor-pointer'
          >
            Log In
          </Link>
        )}
      </nav>
    </header>
  )
}

export default Header
