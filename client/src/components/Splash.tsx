import React from 'react'
import { IoIosChatbubbles } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { Socket, io } from 'socket.io-client';
import { FaRobot } from 'react-icons/fa'

type SplashType = {
    setSocket: React.Dispatch<React.SetStateAction<Socket<DefaultEventsMap, DefaultEventsMap> | null>>
}

function Splash(props: SplashType) {

    const navigate = useNavigate()
  return (
    <div className = 'w-screen overflow-hidden relative md:static flex justify-between items-center h-screen px-32'>
        <div className = 'flex flex-col text-pink-700'>
            <div className = 'absolute md:static top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-x-0 md:translate-y-0'>
                <div className = 'flex gap-1 items-center font-bold justify-start'>
                    <div className = 'lg:text-8xl md:text-6xl text-5xl'>
                        <IoIosChatbubbles />
                    </div>
                    <div className = 'lg:text-8xl md:text-6xl text-5xl'>IntelliChat</div>
                </div>
                <div className = 'text-xs md:text-sm mt-3 ml-10 text-pink-400 border-red-200'>A simple chat application with an AI assistant.</div>
                <button onClick = {() => { 
                    const socket = io('https://intellichat.onrender.com/', {
                        withCredentials: true,
                    })
                    socket.on('connect', () => {
                        socket.emit('newUser', socket.id)
                        socket.emit('oldUsers', socket.id)
                    })
                    props.setSocket(socket)
                    navigate('/home', { replace: true }) }} className='rounded-md hover:scale-110 w-full self-center transition duration-500 mt-12 py-1 md:py-2 items-center justify-center lg:px-16 md:px-12 px-8 text-sm md:text-md gap-2 font-bold md:text-pink-700 md:border-2 md:bg-white bg-pink-700 text-white md:border-pink-700 md:hover:bg-pink-700 md:hover:text-white flex'>
                    Start Texting
                </button>
            </div>
        </div>
        <div className = 'lg:text-vvl md:text-vl text-9xl opacity-25 hidden md:block -rotate-45 text-pink-400'>
            <FaRobot />
        </div>
    </div>
  )
}

export default Splash