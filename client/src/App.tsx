import React from 'react'
import Splash from './components/Splash';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { Socket } from 'socket.io-client';
import { IoChatbubblesOutline } from 'react-icons/io5'
import Bot from './components/Bot';

function App() {

  const [socket, setSocket] = React.useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null)  
  return (
    <div className = 'w-screen font-nunito h-screen'>
      <nav className = 'w-full flex fixed shadow-md shadow-gray-400 top-0 left-0 bg-teal-800 text-white items-center gap-1 z-20 pl-3 py-1'>
        <div className = 'text-lg'>
          <IoChatbubblesOutline />
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