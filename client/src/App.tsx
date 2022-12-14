import React from 'react'
import Splash from './components/Splash';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { Socket } from 'socket.io-client';
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoChatbubblesOutline } from 'react-icons/io5'
import NavTray from './components/NavTray';

function App() {
  const [socket, setSocket] = React.useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null)  
  const [hideNav, setHideNav] = React.useState<boolean>(true)
  return (
    <div className = 'w-screen relative font-nunito h-screen'>
      {!hideNav && <div className = 'md:hidden h-screen bg-green-300 z-20 absolute top-0 left-0 w-1/2'>
        <NavTray />
      </div>}
      <nav className = 'w-full flex fixed shadow-sm shadow-gray-600 top-0 left-0 bg-teal-800 text-white items-center gap-1 z-20 pl-3 py-1'>
        <GiHamburgerMenu onClick = {() => {
          setHideNav(i => !i)
        }} className = 'md:hidden cursor-pointer text-xl mr-2' />
        <div className = 'text-lg'>
          <IoChatbubblesOutline/>
        </div>
        IntelliChat
      </nav>
      <Routes>
        <Route path='/' element={<Splash setSocket = {setSocket}/>} />
        <Route path = '/home' element = {<Home socket = {socket} />} />
      </Routes>
    </div>
  )
}

export default App