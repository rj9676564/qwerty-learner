import KeyEventHandler from '../KeyEventHandler'
import TextAreaHandler from '../TextAreaHandler'
import { currentDictInfoAtom } from '@/store'
import { useAtomValue } from 'jotai'
import type { FormEvent } from 'react'
import { useMemo, useState } from 'react'

export default function InputHandler({ updateInput }: { updateInput: (updateObj: WordUpdateAction) => void }) {
  const dictInfo = useAtomValue(currentDictInfoAtom)
  // isMobile 
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600)
  
  const handler = useMemo(() => {
    switch (dictInfo.language) {
      case 'en':
        console.log('en')
        if(isMobile){
          return <TextAreaHandler updateInput={updateInput} />
        }
        return <KeyEventHandler updateInput={updateInput} />
      case 'de':
        console.log('de')
        return <KeyEventHandler updateInput={updateInput} />
      case 'romaji':
        console.log('romaji')
        return <KeyEventHandler updateInput={updateInput} />
      case 'code':
        return <TextAreaHandler updateInput={updateInput} />
      default:
        return <TextAreaHandler updateInput={updateInput} />
    }
  }, [dictInfo.language, updateInput])

  return <>{handler}</>
}
export type WordUpdateAction = WordAddAction | WordDeleteAction | WordCompositionAction

export type WordAddAction = {
  type: 'add'
  value: string
  event: FormEvent<HTMLTextAreaElement> | KeyboardEvent
}

export type WordDeleteAction = {
  type: 'delete'
  length: number
}

// composition api is not ready yet
export type WordCompositionAction = {
  type: 'composition'
  value: string
}
