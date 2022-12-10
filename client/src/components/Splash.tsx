import React from 'react'
import { MdMessage } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { Socket, io } from 'socket.io-client';

type SplashType = {
    setSocket: React.Dispatch<React.SetStateAction<Socket<DefaultEventsMap, DefaultEventsMap> | null>>
}

function Splash(props: SplashType) {
    const navigate = useNavigate()
  return (
    <div className = 'w-screen relative h-screen'>
        <div className = 'flex flex-col text-gray-600 absolute top-2/4 left-1/2 -translate-y-1/2 -translate-x-1/2'>
            <div className = 'flex gap-1 scale-150 items-center font-bold justify-center'>
                <div className = 'text-7xl'>
                    <MdMessage />
                </div>
                <div className = 'text-5xl'>Chats</div>
            </div>
            <div className = 'text-sm mt-3 text-gray-400 border-red-200'>A simple chat application.</div>
            <button onClick = {() => { 
                const socket = io('http://localhost:5000')
                props.setSocket(socket)
                navigate('/home') }} className='rounded-full hover:scale-150 scale-125 w-full self-center transition duration-500 mt-12 py-2 items-center justify-center px-16 text-md gap-2 font-bold text-gray-400 border-2 border-gray-400 hover:bg-gray-400 hover:text-white flex'>
                <div className = 'flex -rotate-45 text-2xl bg-gray-300 items-center font-xl'>
                </div>
                Start Texting
            </button>
        </div>
    </div>
  )
}

export default Splash