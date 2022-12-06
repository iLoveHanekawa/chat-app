import React from 'react'
import { io, Socket } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

type FormType = {
  setMsgs: React.Dispatch<React.SetStateAction<{
    isSent: boolean;
    msg: string;
}[]>>
}

function Form(props: FormType) {
  const [textInput, setTextInput] = React.useState<string>('')
  const [socket, setSocket] = React.useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null)
  socket?.on('connect', () => {
    console.log('hi');   
    socket.emit('id', socket.id)
    socket?.on('message', (msg) => {
      props.setMsgs(i => [...i, { isSent: false, msg: msg }])
    })
  }) 
  React.useEffect(() => {
    const newSocket = io('http://localhost:5000')
    setSocket(newSocket)
    return () => {
      socket?.close()
    }
  }, [])

  return (
    <form className = 'flex gap-2 text-gray-500 overflow-x-hidden absolute bottom-0 mb-1 right-0 w-full' onSubmit = {(e) => {
      e.preventDefault()
      socket?.emit('message', textInput)
      props.setMsgs(i => [...i, { isSent: true, msg: textInput}])
      socket?.on('all', (msg) => {
        console.log(msg);
      })
      setTextInput('')
    }}>
      <input className = 'w-full indent-2 ml-3 focus:outline-none' placeholder='Enter message' id = 'textInput' type = 'text' value = {textInput} onChange = {(e) => {
        setTextInput(e.currentTarget.value)
      }} />
      <button className = 'bg-red-300 px-3 py-1 font-bold text-white mr-1 rounded-r-sm'>Send</button>
    </form>
  )
}

export default Form