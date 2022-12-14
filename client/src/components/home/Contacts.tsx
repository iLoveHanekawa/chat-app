import React, { SetStateAction } from 'react'
import { AiFillRobot } from 'react-icons/ai'
import { GiVintageRobot } from 'react-icons/gi'
import { Socket } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { FaUserCircle } from 'react-icons/fa'

type ContactsType = {
    active: number
    setActive: React.Dispatch<SetStateAction<number>>
    socket: Socket<DefaultEventsMap, DefaultEventsMap> | null
}

function Contacts(props: ContactsType) {
    
    const [list, setList] = React.useState<{id: string, animal: string}[]>([{id: 'bot', animal: 'Chat assistant'}])
    React.useEffect(() => {
        props.socket?.on('newUser', (id: string, animal: string) => {
            setList(i => [...i, { id: id, animal: 'Anonymous ' + animal }])
        })
    }, [])
  return (
    <ul className = 'h-4/6 text-gray-500 flex flex-col'>
        {
            list.map(({id, animal}, index) => {
                return <li onClick = {() => {
                    props.setActive(index)
                }} className = {`${props.active === index? 'bg-teal-500 text-white': 'text-teal-400 hover:bg-teal-500'} cursor-pointer shadow-md hover:text-white transition duration-500 flex justify-start items-center gap-4 w-full pl-3 py-3 lg:text-6xl md:text-4xl sm:text-2xl`} key = {index}>{index === 0? <GiVintageRobot />: <FaUserCircle />}<div className = 'lg:text-lg md:text-md sm:text-sm'>{animal}</div></li>
            })
        }
    </ul>
  )
}

export default Contacts