import { FormEvent, useState } from 'react'
import { ArrowLeft } from 'phosphor-react'
import { feedbackTypes, FeedbackType } from '..'
import { CloseButton } from '../../CloseButton'
import { ScreenshotButton } from '../ScreenshotButton'
import { api } from '../../../lib/api'
import { Loading } from '../../Loading'

interface FeedbackContentStepProps {
  feedbackType: FeedbackType
  onFeedbackRestartRequested: () => void
  onFeedbackSent: () => void
}

export function FeedbackContentStep({ 
  feedbackType, 
  onFeedbackRestartRequested,
  onFeedbackSent,
}: FeedbackContentStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [comment, setComment] = useState('')
  const [isSendingFeedback, setIsSendingFeedback] = useState(false)
  
  const feedbackTypeInfo = feedbackTypes[feedbackType]
  
  function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault()
    
    setIsSendingFeedback(true)

    api.post('/feedbacks', {
      type: feedbackType,
      comment,
      screenshot,
    });

    setIsSendingFeedback(false);
    
    onFeedbackSent()
  }

  return (
    <>
      <header className='text-xl leading-6'>
        <button 
          type='button' 
          className='top-5 left-5 absolute text-zinc-400 hover:text-zinc-100'
          onClick={onFeedbackRestartRequested}
        >
          <ArrowLeft weight='bold' className='w-4 h-4'/>
        </button>
        <span className='flex'>
          <img 
            src={feedbackTypeInfo.image.source} 
            alt={feedbackTypeInfo.image.alt} 
            className='w-6 h-6'
          />
          {feedbackTypeInfo.title}
        </span>
        <CloseButton />
      </header>
     
      <form 
        action=""
        className='my-4 w-full'
        onSubmit={handleSubmitFeedback}
      >
        <textarea 
          className='txtarea'
          placeholder='Conte com detalhes o que está acontecento...'
          onChange={(event) => setComment(event.target.value)}
        />

        <footer className='flex gap-2 mt-2'>
          <ScreenshotButton 
            screenshot={screenshot}
            onScreenshotTook={setScreenshot}
          />
          <button
            type='submit'
            className='submit-btn'
            disabled={comment === '' || comment.length === 0 || isSendingFeedback}
          >
            {isSendingFeedback ? <Loading /> : 'Enviar Feedback'}
          </button>
        </footer>
      </form>
    </>
  )
}
