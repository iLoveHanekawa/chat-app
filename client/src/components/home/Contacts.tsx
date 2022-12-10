import React, { SetStateAction } from 'react'
import { AiFillRobot } from 'react-icons/ai'
import { GiVintageRobot } from 'react-icons/gi'

type ContactsType = {
    active: number
    setActive: React.Dispatch<SetStateAction<number>>
}

function Contacts(props: ContactsType) {
    
    const [list, setList] = React.useState<string[]>(['Chat assistant'])

  return (
    <ul className = 'h-4/6 text-gray-500 flex flex-col text-6xl'>
        {
            list.map((i, index) => {
                return <li onClick = {() => {
                    props.setActive(index)
                }} className = {`${props.active === index? 'bg-teal-400 text-white': ''} shadow-md hover:text-white hover:bg-teal-400 transition duration-500 flex justify-start items-center gap-4 w-full pl-3 py-3`} key = {index}>{index === 0 && <GiVintageRobot />}<div className = 'text-lg'>{i}</div></li>
            })
        }
    </ul>
  )
}

export default Contacts