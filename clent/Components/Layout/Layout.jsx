import React, { useContext } from 'react'
import { AppContext } from '../../context';
import NavBar from '../NavBar/NavBar'

const Layout = ({ children }) => {
  const [context, setContext] = useContext(AppContext);
  return (
    <>
      {
        context?.loading ? <div className='flex flex-col items-center justify-center w-screen h-screen gap-2 align-middle'><div className="text-orange-400 radial-progress animate-spin" style={{ "--value": 60 }}></div>
          Loading...
        </div> : <div >
          <div className='h-screen'>
            <div className='flex h-full gap-2 p-3 md:p-7'>
              <div className='hidden md:block'>{context?.user?._id ? <NavBar /> : <></>}</div>
              <main className='flex-1 p-2 px-2 md:px-5 md:p-4'>
                <div className='flex w-full h-screen overflow-y-auto feeds__suggestions'>
                  {children}

                </div>

              </main>
            </div>
          </div>
        </div>
      }

    </>
  )
}

export default Layout