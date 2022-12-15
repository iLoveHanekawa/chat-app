import React, { MutableRefObject, SetStateAction } from 'react'
import { Socket } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { useSelector, useDispatch } from 'react-redux'
import { StateType, AppDispatch } from '../../app/store'
import { fetchData } from '../../features/atlas'
import axios from 'axios'

type FormType = {
  setMsgs: React.Dispatch<React.SetStateAction<{
    isSent: boolean;
    msg: string;
    sentBy: string
}[]>>
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | null
  listRef: MutableRefObject<HTMLDivElement | null>
}


function Form(props: FormType) {
  const dispatch: AppDispatch = useDispatch()
  const recipient = useSelector((state: StateType) => state.recipient.id)
  const result = useSelector((state: StateType) => state.atlas.result)
  const loading = useSelector((state: StateType) => state.atlas.loading)
  const activeIndex = useSelector((state: StateType) => { return state.activeElement.index })
  const [text, setText] = React.useState('')
  const userSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    props.setMsgs(i => [...i, { isSent: true, msg: text, sentBy: props.socket?.id as string}])
    props.socket?.emit('message', text, recipient, props.socket.id)
  }
  
  const botSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await dispatch(fetchData({
      url: 'https://chat-app-production-df1f.up.railway.app/api/v1/',
      body: {
        data: {
            msg: text,
        }
      }
    }))
  }

  const [typing, setTyping] = React.useState({ status: false, msg: ''})

  React.useEffect(() => {
    if(result != '') props.setMsgs(i => [...i, { isSent: false, msg: result, sentBy: 'Atlas' }])
  }, [result])

  React.useEffect(() => {
    props.socket?.on('typingEvent', msg => {
      setTyping({ status: true, msg: msg })

    })
    props.socket?.on('stopTypingEvent', () => {
      setTyping({ status: false, msg: '' })
    })
  }, [])

  return (
    <div className = 'w-screen'>
        <div className = 'md:w-4/6 w-full border-l-2 border-teal-100 absolute right-0 bottom-0'>
          {loading && <div className = 'ml-2 text-xs text-gray-400'>Atlas is typing...</div>}
          {typing.status && <div className = 'ml-2 text-xs text-gray-400'>{typing.msg}</div>}
            <form onSubmit={(e) => {
              if(activeIndex > 0) {
                props.socket?.emit('stopTyping', recipient)
                userSubmit(e)
              }
              else {
                props.setMsgs(i => [...i,{isSent: true, msg: text, sentBy: props.socket?.id as string }])
                botSubmit(e)
              }
            }} className = 'flex w-full p-1 px-3'>
                <input value = {text} onKeyUp = {(e) => {
                  setTimeout(() => { 
                    props.socket?.emit('stopTyping', recipient)
                  }, 2000)
                }} onKeyDown = {(e) => {
                  props.socket?.emit('typing', recipient, props.socket.id)
                }} onChange = {(e) => {
                  setText(e.currentTarget.value)
                }} type = 'text' placeholder='Type messsage' className = 'text-gray-400 focus:outline-none indent-2 w-full' />
                <button className = 'font-bold hover:scale-105 rounded-md py-2 px-4 w-20 transition duration-500 bg-teal-600 text-white'>Send</button>
            </form>
        </div>
    </div>
  )
}

export default Form