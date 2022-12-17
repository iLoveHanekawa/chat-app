import React, { MutableRefObject, SetStateAction } from 'react'
import { Socket } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { useSelector } from 'react-redux'
import { StateType } from '../../app/store'

type ListType = {
    setMsgs: React.Dispatch<SetStateAction<{ isSent: boolean, msg: string, sentBy: string}[]>>
    msgs: { isSent: boolean, msg: string, sentBy: string }[]
    socket: Socket<DefaultEventsMap, DefaultEventsMap> | null
    listRef: MutableRefObject<HTMLDivElement | null>
    setEh: React.Dispatch<SetStateAction<number>>
    eh: number
}

function List(props: ListType) {

    const strayRef = React.useRef() as MutableRefObject<HTMLDivElement | null>
    const recipient = useSelector((state: StateType) => state.recipient.id)
    React.useEffect(() => {
        props.socket?.on('message', (msg, sentBy) => {
            props.setMsgs(i => [...i, { isSent: false, msg: msg, sentBy: sentBy }])
        })
        props.socket?.on('joinMessage', (joinedby) => {
            props.setMsgs(i => [...i, { isSent: false, msg: `Anonymous ${joinedby} just joined!`, sentBy: 'joinMessage'}])
        })
        props.socket?.on('leftMessage', (leftBy) => {
            props.setMsgs(i => [...i, { isSent: false, msg: `Anonymous ${leftBy} has left the chat...`, sentBy: 'leftMessage'}])

        })
    }, [])

    React.useEffect(() => {
        props.setEh(strayRef.current?.clientHeight || 0)
    }, [strayRef.current?.clientHeight, props.msgs.length])

  return (
    <div ref = {props.listRef} className = 'border-l-2 py-8 border-teal-100 z-10 w-full mt-10 md:w-4/6 overflow-scroll h-nvh overflow-x-hidden right-0 top-0 absolute customScrollbar'>
        <ul className = 'flex flex-col py-1 px-3'>
            {props.msgs.map(({ isSent, msg, sentBy }: { isSent: boolean, msg: string, sentBy: string }, i: number) => {
                const time = new Date(Date.now())
                if(sentBy === 'joinMessage' || sentBy === 'leftMessage') return <div className = 'flex mb-7 mt-2 text-gray-400 text-xs flex-col justify-center items-center'>
                    <div>{msg}</div>
                </div>
                return <div key = {i} ref = {strayRef} className = 'flex mb-7 flex-col'>
                    {!isSent? <div className = 'text-gray-400 self-start text-xs'>{sentBy}</div>: <div className = 'text-gray-400 self-end text-xs'>You</div>}
                    <li className = {`${isSent? 'sent': 'received'} max-w-4/5 md:text-md text-sm`}>
                    { msg }
                    </li>
                    <div className = {`${isSent? 'self-end': 'self-start'} text-teal-300 text-xs mt-1`}>{time.toString()}</div>
                </div>
            })}
        </ul>
    </div>
  )
}

export default List