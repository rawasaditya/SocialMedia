import React from 'react'
import {FiHome,FiSearch, FiCompass, FiLogIn, FiPlusSquare} from 'react-icons/fi'
import Link from 'next/link'
import { useRouter } from "next/router";

const NavBar = () => {
  const router = useRouter();
  console.log(router)
  return (
    <nav className='h-full w-80 border-r flex flex-col'>
      <ul className='mb-14'>
        <li className='font-bold brand text-2xl'>Aditya Connect</li>
      </ul>
      <ul className='navWrapper'>

      <Link href="/" className={`${router.route == '/' ? "active" : null}`}>
        <li className='navLink'>
         <FiHome /> <span>Home</span> 
        </li>
        </Link>
        <li className='navLink'>
         <FiSearch /> <span>Search</span>
        </li>
        <li className='navLink'>
         <FiCompass /> <span>Explore</span>
        </li>
        <li className='navLink'>
        <FiPlusSquare /> <span>Create Post</span>
        </li>
      </ul>
      <ul className='navWrapper h-full justify-end'>
         <Link href="/login" className={`${router.route == '/login' ? "active" : null}`}>
        <li className='navLink  border-t'>
         <FiLogIn /> <span>Login</span> 
        </li>
         </Link>
      </ul>
    </nav>
  )
}

export default NavBar