import React from 'react'
import Form from './Form'
import List from './List'
import { Socket } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { useNavigate } from 'react-router-dom'
import Contacts from './Contacts'

type HomeType = {
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | null
}

function Home(props: HomeType) {

  const navigate = useNavigate()

  const [msgs, setMsgs] = React.useState<{ isSent: boolean, msg: string }[]>([])
  const [active, setActive] = React.useState<number>(-1)
  console.log(msgs);
  
  React.useEffect(() => {
    if(props.socket === null) {
      navigate('/')
    }
  }, [])

  return (
    <div className = 'w-screen h-screen relative'>
      <div className = 'hidden md:w-2/6 flex-col absolute md:flex h-full left-0 top-0'>
        <div className = 'h-2/6 bg-teal-400 flex flex-col pt-24 pl-10'>
          <div className = 'text-white text-6xl font-bold'>Contacts</div>
          <div className='mt-2 text-white text-xs pl-10'>Everyone's offline? Text with the AI assistant</div>
        </div>    
        <Contacts active = {active} setActive = {setActive} />
      </div>
      <List socket = {props.socket} msgs = {msgs} setMsgs = {setMsgs} />
      <Form active = {active} socket = {props.socket} setMsgs={setMsgs} />
    </div>
  )
}

export default Home