import React, { MutableRefObject, SetStateAction } from 'react'
import Form from './Form'
import List from './List'
import { useNavigate } from 'react-router-dom'
import Contacts from './Contacts'
import { Socket } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { RiContactsLine } from 'react-icons/ri'
import NavTray from '../NavTray'

type HomeType = {
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | null
  hideNav: boolean
  setHideNav: React.Dispatch<SetStateAction<boolean>>
}

function Home(props: HomeType) {

  const navigate = useNavigate()

  const [msgs, setMsgs] = React.useState<{ isSent: boolean, msg: string, sentBy: string }[]>([])
  const listRef = React.useRef() as MutableRefObject<HTMLDivElement | null>
  const [eh, setEh] = React.useState(0)
  
  listRef.current?.scrollTo({top: listRef.current.scrollHeight + eh, behavior: 'smooth'})
  
  React.useEffect(() => {
    if(props.socket === null) {
      navigate('/')
    }
  }, [eh])

  return (
    <div className = 'w-screen h-screen relative overflow-hidden'>
      <div className = {`${props.hideNav? '': 'z-20'} md:hidden h-screen absolute top-0 left-0 w-2/3`}>
        <NavTray setHideNav = {props.setHideNav} hideNav = {props.hideNav} socket = {props.socket} />
      </div>
      <div className = 'hidden shadow-md shadow-gray-200 md:w-2/6 flex-col absolute md:flex h-full left-0 top-0'>
        <div className = 'h-2/6 bg-pink-600 flex flex-col pt-24 pl-10'>
          <div className = 'text-white lg:text-5xl md:text-4xl text-3xl font-bold flex pr-5 items-end gap-3'>
            <div className = 'lg:text-7xl md:text-5xl text-4xl'>
              <RiContactsLine />
            </div>
            Contacts
          </div>
          <div className='mt-2 text-white text-xs px-10'>Everyone's offline? Text with the AI assistant</div>
        </div>    
        <Contacts socket = {props.socket} />
      </div>
      <List eh={eh} setEh={setEh} listRef={listRef} socket = {props.socket} msgs = {msgs} setMsgs = {setMsgs} />
      <Form listRef={listRef} socket = {props.socket} setMsgs={setMsgs} />
    </div>
  )
}

export default Home