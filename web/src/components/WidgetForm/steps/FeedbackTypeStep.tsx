import { FeedbackType, feedbackTypes } from '..'
import { CloseButton } from '../../CloseButton'

interface FeedbackTypeStepProps {
  onFeedbackTypeChanged: (type: FeedbackType) => void
}

export function FeedbackTypeStep({ onFeedbackTypeChanged } : FeedbackTypeStepProps) {
  return (
    <>
      <header className='text-xl leading-6'>
        <span>Deixe seu Feedback</span>
        <CloseButton />
      </header>
      <div className='flex py-8 gap-2 w-full'>
      {
        Object.entries(feedbackTypes).map(([key, value]) => {
          return (
            <button
              key={key}
              className='icon-btn'
              onClick={() => onFeedbackTypeChanged(key as FeedbackType)}
              type='button'
            >
              <img src={value.image.source} alt={value.image.alt} />
              <span>{value.title}</span>
            </button>
          )
        })}
      </div>
    </>
  )
}