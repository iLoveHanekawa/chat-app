import React, { MutableRefObject, SetStateAction } from 'react'
import { Socket } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import axios from 'axios'

type FormType = {
  setMsgs: React.Dispatch<React.SetStateAction<{
    isSent: boolean;
    msg: string;
}[]>>
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | null
  active: number
  listRef: MutableRefObject<HTMLDivElement | null>
  recipient: string
}


function Form(props: FormType) {
  
  const [text, setText] = React.useState('')
  const userSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    props.setMsgs(i => [...i, { isSent: true, msg: text }])
    props.socket?.emit('message', text, props.recipient)
  }
  
  const botSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await axios.post('/api/v1/', {
        data: {
            msg: text,
        }
    })
    const data = await res.data
    props.setMsgs(i => [...i, { isSent: false, msg: data.result }])
}

  return (
    <div className = 'w-screen'>
        <div className = 'md:w-4/6 w-full border-l-2 border-teal-100 absolute right-0 bottom-0'>
            <form onSubmit={(e) => {
              if(props.active > 0) userSubmit(e)
              else {
                props.setMsgs(i => [...i,{isSent: true, msg: text }])
                botSubmit(e)
              }
            }} className = 'flex w-full p-1 px-3'>
                <input value = {text} onChange = {(e) => {
                  setText(e.currentTarget.value)
                }} type = 'text' placeholder='Type messsage' className = 'text-gray-400 focus:outline-none indent-2 w-full' />
                <button className = 'font-bold hover:scale-105 rounded-md py-2 px-4 w-20 transition duration-500 bg-teal-600 text-white'>Send</button>
            </form>
        </div>
    </div>
  )
}

export default Form