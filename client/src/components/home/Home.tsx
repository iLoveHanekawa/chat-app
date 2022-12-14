import React, { MutableRefObject } from 'react'
import Form from './Form'
import List from './List'
import { useNavigate } from 'react-router-dom'
import Contacts from './Contacts'
import { Socket } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { RiContactsLine } from 'react-icons/ri'

type HomeType = {
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | null
}

function Home(props: HomeType) {

  const navigate = useNavigate()

  const [msgs, setMsgs] = React.useState<{ isSent: boolean, msg: string }[]>([])
  const [active, setActive] = React.useState<number>(0)
  const listRef = React.useRef() as MutableRefObject<HTMLDivElement | null>
  const [eh, setEh] = React.useState(0)
  console.log(eh);
  
  listRef.current?.scrollTo({top: listRef.current.scrollHeight + eh, behavior: 'smooth'})
  console.log(msgs);
  
  React.useEffect(() => {
    if(props.socket === null) {
      navigate('/')
    }
  }, [eh])

  return (
    <div className = 'w-screen h-screen relative'>
      <div className = 'hidden md:w-2/6 flex-col absolute md:flex h-full left-0 top-0'>
        <div className = 'h-2/6 bg-teal-500 flex flex-col pt-24 pl-10'>
          <div className = 'text-white lg:text-5xl md:text-4xl text-3xl font-bold flex items-end gap-3'><div className = 'lg:text-7xl md:text-5xl text-4xl'><RiContactsLine /></div>Contacts</div>
          <div className='mt-2 text-white text-xs pl-10'>Everyone's offline? Text with the AI assistant</div>
        </div>    
        <Contacts socket = {props.socket} active = {active} setActive = {setActive} />
      </div>
      <List eh={eh} setEh={setEh} listRef={listRef} socket = {props.socket} msgs = {msgs} setMsgs = {setMsgs} />
      <Form listRef={listRef} active = {active} socket = {props.socket} setMsgs={setMsgs} />
    </div>
  )
}

export default Home