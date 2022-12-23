import React, { MutableRefObject, SetStateAction } from 'react'
import { Socket } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { useSelector, useDispatch } from 'react-redux'
import { StateType, AppDispatch } from '../../app/store'
import { fetchData } from '../../features/atlas'

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
  const [taHeight, setTaHeight] = React.useState<number | string>('auto')
  const result = useSelector((state: StateType) => state.atlas.result)
  const loading = useSelector((state: StateType) => state.atlas.loading)
  const activeIndex = useSelector((state: StateType) => { return state.activeElement.index })
  const [text, setText] = React.useState('')
  const userSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    props.setMsgs(i => [...i, { isSent: true, msg: text, sentBy: props.socket?.id as string}])
    props.socket?.emit('message', text, recipient, props.socket.id)
  }
  
  const botSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    await dispatch(fetchData({
      url: 'https://intellichat.onrender.com/api/v1/',
      body: {
        data: {
            msg: text,
        }
      }
    }))
  }

  const [typing, setTyping] = React.useState({ status: false, msg: ''})
  const taRef = React.useRef() as MutableRefObject<HTMLTextAreaElement>
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
        <div className = 'md:w-4/6 w-full absolute right-0 bottom-0'>
          {loading && <div className = 'ml-2 text-xs text-gray-400'>Atlas is typing...</div>}
          {typing.status && <div className = 'ml-2 text-xs text-gray-400'>{typing.msg}</div>}
            <form onSubmit={(e) => {
              e.preventDefault()
              if(text !== '') {
                setTaHeight('auto')
                if(activeIndex > 0) {
                  props.socket?.emit('stopTyping', recipient)
                  userSubmit(e)
                }
                else {
                  props.setMsgs(i => [...i,{isSent: true, msg: text, sentBy: props.socket?.id as string }])
                  botSubmit(e)
                }
                setText('')
              }
            }} className = 'flex w-full p-1 px-1'>
                <textarea ref = {taRef} style = {{
                  height: taHeight
                }} value = {text} onKeyUp = {(e) => {
                  setTimeout(() => { 
                    props.socket?.emit('stopTyping', recipient)
                  }, 2000)
                }} onKeyDown = {(e) => {
                  setTaHeight('auto')
                  props.socket?.emit('typing', recipient, props.socket.id)
                }} onChange = {(e) => {
                  if(e.currentTarget.scrollHeight != taHeight) setTaHeight(e.currentTarget.scrollHeight)
                  setText(e.currentTarget.value)
                }} placeholder='Type messsage' rows={1} className = 'text-gray-400 z-20 pr-4 text-sm md:text-md focus:outline-none py-2 pl-2 max-h-min w-full' />
                <button className = 'font-bold hover:scale-105 rounded-md py-1 sm:py-2 w-20 md:text-md sm:text-sm text-xs transition duration-500 bg-pink-600 z-10 h-10 self-end text-white'>Send</button>
            </form>
        </div>
    </div>
  )
}

export default Form