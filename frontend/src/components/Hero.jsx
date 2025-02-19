import { Link } from 'react-router'
import { useUser } from '../context/UserContext'

const Hero = () => {
  const { userData, logout } = useUser() // Assuming logout function exists

  return (
    <section className='flex items-center justify-center  px-4 h-[80%] '>
      <div className='flex flex-col md:flex-row-reverse items-center justify-between w-full max-w-5xl gap-y-6'>
        <div className='w-40 h-40 md:w-56 md:h-56 flex items-center justify-center bg-white rounded-full shadow-md overflow-hidden'>
          <img
            src='/images/developer.jpg'
            alt='Developer'
            className='w-full h-full object-cover rounded-full'
          />
        </div>

        <div className='text-center md:text-left'>
          <h2 className='text-4xl md:text-7xl font-semibold'>
            Hey,{' '}
            <span className='font-bold'>
              {userData?.name
                ? userData.name.charAt(0).toUpperCase() + userData.name.slice(1)
                : 'Developer'}
            </span>
          </h2>
          <p className='text-lg text-gray-700 mt-6 md:text-3xl max-w-2xl'>
            Authenticate, secure, and explore your digital identity starts here.
          </p>

          <div className='mt-6 flex justify-center md:justify-start gap-4'>
            {userData ? (
              <button
                onClick={logout}
                className='px-6 py-2 bg-red-500 cursor-pointer hover:bg-red-600 text-white rounded-lg transition duration-300'
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to='/sign-up'
                  className='px-6 py-2 bg-slate-900 hover:opacity-80 text-white rounded-lg transition duration-300'
                >
                  Sign Up
                </Link>
                <Link
                  to='/sign-in'
                  className='border px-6 py-2 rounded-lg bg-white text-slate-900 
             hover:bg-slate-900 hover:text-white transition duration-300 cursor-pointer'
                >
                  Log In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
