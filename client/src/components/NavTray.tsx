import React, { SetStateAction } from 'react'
import { RiContactsLine} from 'react-icons/ri'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { MdNavigateBefore } from 'react-icons/md'
import { Socket } from 'socket.io-client'
import Contacts from './home/Contacts'

type NavTrayType = {
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | null
  setHideNav: React.Dispatch<SetStateAction<boolean>>
  hideNav: boolean
}

function NavTray(props: NavTrayType) {  

  return (
    <div className = {`${props.hideNav? '-scale-x-50':''} h-full bg-white origin-left transition duration-200 w-full flex flex-col`}>
      <div className = 'h-2/6 bg-pink-700 flex flex-col pr-10'>
        <MdNavigateBefore onClick = {() => {
          props.setHideNav(i => !i)
        }} className = 'text-white text-4xl mt-12 cursor-pointer' />
          <div className = 'text-white pt-3 pl-4 lg:text-5xl md:text-4xl text-xl font-bold flex items-end gap-3'>
            <div className = 'lg:text-7xl pl-4 md:text-5xl text-3xl'>
              <RiContactsLine />
            </div>
            Contacts</div>
          <div className='mt-2 text-gray-200 text-xxs pl-12'>Everyone's offline? Text with the AI assistant</div>
      </div>
      <Contacts socket = { props.socket } />
    </div>
  )
}

export default NavTray