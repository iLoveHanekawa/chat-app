import React, { SetStateAction } from 'react'
import { Socket } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

type ListType = {
    setMsgs: React.Dispatch<SetStateAction<{ isSent: boolean, msg: string}[]>>
    msgs: { isSent: boolean, msg: string }[]
    socket: Socket<DefaultEventsMap, DefaultEventsMap> | null
}

function List(props: ListType) {

    React.useEffect(() => {
        props.socket?.on('message', (msg) => {
            props.setMsgs(i => [...i, { isSent: false, msg: msg }])
        })
    }, [])

  return (
    <div className = 'border-l-2 py-8 border-gray-200 z-10 w-full md:w-4/6 overflow-scroll h-nvh overflow-x-hidden scrollbar-thin right-0 top-0 absolute scrollbar-thumb-rounded-full scrollbar-thumb-gray-300'>
        <ul className = 'flex flex-col py-1 px-3'>
            {props.msgs.map(({ isSent, msg }: { isSent: boolean, msg: string }, i: number) => {
                const time = new Date(Date.now())
                return <div className = 'flex flex-col'>
                    <li className = {`${isSent? 'sent': 'received'} max-w-1/2`} key = {i}>
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