import React, { useContext } from 'react'
import { AppContext } from '../../context';
import NavBar from '../NavBar/NavBar'

const Layout = ({ children }) => {
  const [context, setContext] = useContext(AppContext);
  return (
    <>
      {
        context?.loading ? <div className='h-screen w-screen flex justify-center align-middle items-center flex-col gap-2'><div className="radial-progress text-orange-400 animate-spin" style={{ "--value": 60 }}></div>
          Loading...
        </div> : <div >
          <div className='h-screen'>
            <div className='flex gap-2 p-3 md:p-7 h-full'>
              <div className='hidden md:block'>{context?.user?._id ? <NavBar /> : <></>}</div>
              <main className='flex-1 px-2 md:px-5 '>
                {children}
              </main>
            </div>
          </div>
        </div>
      }

    </>
  )
}

export default Layout