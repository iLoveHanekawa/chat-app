import React, { SetStateAction } from 'react'
import { AiFillRobot } from 'react-icons/ai'
import { GiVintageRobot } from 'react-icons/gi'
import { Socket } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { FaUserCircle } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, StateType } from '../../app/store'
import { indexActions } from '../../features/active'
import { recipientActions } from '../../features/recipient'

type ContactsType = {
    socket: Socket<DefaultEventsMap, DefaultEventsMap> | null
}

function Contacts(props: ContactsType) {
    const dispatch: AppDispatch = useDispatch()
    const recipient = useSelector((state: StateType) => state.recipient.id)
    const activeIndex = useSelector((state: StateType) => { return state.activeElement.index })
    const [list, setList] = React.useState<{id: string, animal: string}[]>([{id: 'bot', animal: 'Atlas'}])
    React.useEffect(() => {
        props.socket?.on('newUser', (id: string, animal: string) => {
            setList(i => [...i, { id: id, animal: 'Anonymous ' + animal }])
        })
    }, [])
    console.log(list);
    
  return (
    <ul className = 'h-4/6 scrollbar-thin md:shadow-none shadow-md shadow-gray-200 scrollbar-thumb-rounded-full scrollbar-thumb-gray-300 text-gray-500 flex flex-col'>
        {
            list.map(({id, animal}, index) => {
                return <li onClick = {() => {
                    dispatch(indexActions.setindex(index))
                    dispatch(recipientActions.setRecipientId(id)) 
                    if(recipient != 'bot') props.socket?.emit('leave', props.socket.id, recipient)  
                    props.socket?.emit('join', props.socket.id, id)
                }} className = {`${activeIndex === index? 'bg-teal-600 text-white': 'text-teal-600 hover:bg-teal-600'} cursor-pointer shadow-md hover:text-white transition duration-500 flex justify-start items-center gap-4 w-full pl-3 py-5 lg:text-5xl md:text-4xl text-4xl`} key = {index}>
                    {index === 0? <GiVintageRobot />: <FaUserCircle />}
                    <div className = 'lg:text-lg md:text-md sm:text-xs text-xs'>{animal}</div>
                    </li>
            })
        }
    </ul>
  )
}

export default Contacts