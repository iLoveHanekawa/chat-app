import axios from 'axios'
import React from 'react'

function Bot() {

    const [textInput, setTextInput] = React.useState<string>('')
    
    
  return (
    <div className = ''>
        <form onSubmit = {async (e) => {
            e.preventDefault()
            const res = await axios.post('/api/v1/', {
                data: {
                    msg: textInput
                }
            })
            const data = await res.data
            console.log(data.result);
        }}>
            <input className = '' type = 'text' value = {textInput} onChange = {(e) => {
                setTextInput(e.currentTarget.value)
            }} />
        </form>
    </div>
  )
}

export default Bot