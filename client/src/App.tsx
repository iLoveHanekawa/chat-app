import React from 'react'
import Splash from './components/Splash';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/home/Home';
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { Socket } from 'socket.io-client';
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoChatbubblesOutline } from 'react-icons/io5'

function App() {
  const [socket, setSocket] = React.useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null)  
  const { pathname } = useLocation()
  
  const [hideNav, setHideNav] = React.useState<boolean>(true)
  return (
    <div className = 'w-screen relative font-nunito h-screen'>
      <nav className = 'w-full flex fixed shadow-sm shadow-gray-600 top-0 left-0 bg-teal-800 text-white items-center gap-1 z-20 pl-3 py-1'>
        <GiHamburgerMenu onClick = {() => {
          setHideNav(i => !i)
        }} className = {`md:hidden cursor-pointer text-xl mr-2 ${pathname !== '/'? '': 'cursor-not-allowed'}`} />
        <div className = 'text-lg'>
          <IoChatbubblesOutline/>
        </div>
        IntelliChat
      </nav>
      <Routes>
        <Route path='/' element={<Splash setSocket = {setSocket}/>} />
        <Route path = '/home' element = {<Home hideNav = {hideNav} setHideNav = {setHideNav} socket = {socket} />} />
      </Routes>
    </div>
  )
}

export default App