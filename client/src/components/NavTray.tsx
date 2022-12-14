import React from 'react'
import { RiContactsLine} from 'react-icons/ri'

function NavTray() {
  return (
    <div className = 'h-2/6 bg-teal-600 flex flex-col pt-24 pl-4 pr-4'>
        <div className = 'text-white lg:text-5xl md:text-4xl text-3xl font-bold flex items-end gap-3'><div className = 'lg:text-7xl md:text-5xl text-4xl'><RiContactsLine /></div>Contacts</div>
        <div className='mt-2 text-white text-xs pl-10'>Everyone's offline? Text with the AI assistant</div>
    </div> 
  )
}

export default NavTray