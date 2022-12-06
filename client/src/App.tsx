import React from 'react'
import Form from './components/Form'

function App() {

  const [msgs, setMsgs] = React.useState<{ isSent: boolean, msg: string }[]>([])
  console.log(msgs);
  
  return (
    <div className = 'font-nunito w-screen relative h-screen'>
      <div className = 'md:w-4/6 w-full h-screen absolute right-0'>
        <ul className = 'flex flex-col w-full px-1 pt-1'>
          {msgs.map(({ isSent, msg }: { isSent: boolean, msg: string}, i: number) => {
            return <li key = {i} className = {`${isSent? 'sent': 'received'}`}>{msg}</li>
          })}
        </ul>
        <Form setMsgs = {setMsgs} />
      </div>
    </div>
  )
}

export default App