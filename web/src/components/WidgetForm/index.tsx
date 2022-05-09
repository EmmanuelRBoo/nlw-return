import { useState } from 'react';
import { CloseButton } from '../CloseButton'
import bugImg from '../../assets/bug.svg'
import ideaImg from '../../assets/idea.svg'
import thoughtImg from '../../assets/thought.svg'
import { FeedbackTypeStep } from './steps/FeedbackTypeStep';
import { FeedbackContentStep } from './steps/FeedbackContentStep';
import { FeedbackSuccessStep } from './steps/FeedbackSuccessStep';

export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: bugImg,
      alt: 'Imagem de um inseto',
    },
  },
  IDEA: {
    title: 'Ideia',
    image: {
      source: ideaImg,
      alt: 'Imagem de uma lâmpada',
    },
  },
  OTHER: {
    title: 'Outro',
    image: {
      source: thoughtImg,
      alt: 'Imagem de um balão de pensamento'
    },
  },
};

export type FeedbackType = keyof typeof feedbackTypes

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
  const [feedbackSent, setFeedbackSent] = useState(false)

  function handleFeedbackRestart() {
    setFeedbackType(null)
    setFeedbackSent(false)
  }

  return (
    <div className='widget-form'>
      
      {
        feedbackSent
        ? <FeedbackSuccessStep onFeedbackRestartRequested={handleFeedbackRestart}/>
        : (
          <>
            {
              ! feedbackType 
              ? <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
              : <FeedbackContentStep 
                  feedbackType={feedbackType}
                  onFeedbackRestartRequested={handleFeedbackRestart}
                  onFeedbackSent={() => setFeedbackSent(true)}
                /> 
      }
          </>
        )
      }
      
      <footer className='text-xs text-neutral-400'>
        Feito com ♥ por <a 
          className='underline underline-offset-2'
          href="https://www.github.com/emmanuelrboo" 
          target={'_blank'}
        >
          Emmanuel
        </a>
      </footer>
    </div>
  );
}