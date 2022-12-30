import React from 'react'
import NavBar from '../NavBar/NavBar'

const Layout = ({children}) => {
  return (
    <>
    <div >
        <div className='h-screen'>
        <div className='flex gap-2  p-7 h-full'>
        <NavBar />
        <main  className='flex-1 px-5 '>
        {children}
        </main>
        </div>
        </div>
    </div>
    </>
  )
}

export default Layout