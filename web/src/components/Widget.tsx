import { ChatTeardropDots } from 'phosphor-react'
import { Popover } from '@headlessui/react' 
import { WidgetForm } from './WidgetForm'

export function Widget() {
  return (
    <Popover className='btn-container'>
      <Popover.Panel>
        <WidgetForm />
      </Popover.Panel>

      <Popover.Button className='btn group'>
        <ChatTeardropDots className='w-6 h-6' />
        <span className='span-btn'>
          <span className='pl-2'></span>
          Feedback
        </span>
      </Popover.Button>
    </Popover>
  )
}