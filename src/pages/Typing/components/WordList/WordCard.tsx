import type { WordPronunciationIconRef } from '@/components/WordPronunciationIcon'
import { WordPronunciationIcon } from '@/components/WordPronunciationIcon'
import { currentDictInfoAtom } from '@/store'
import type { Word } from '@/typings'
import { useAtomValue } from 'jotai'
import { useCallback, useRef, useState } from 'react'

export default function WordCard({ word, isActive }: { word: Word; isActive: boolean }) {
  const wordPronunciationIconRef = useRef<WordPronunciationIconRef>(null)
  const currentLanguage = useAtomValue(currentDictInfoAtom).language
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600)

  const handlePlay = useCallback(() => {
    wordPronunciationIconRef.current?.play()
  }, [])

  return (
    <div
      className={`mb-2 flex cursor-pointer select-text items-center rounded-xl p-4 shadow focus:outline-none ${isActive ? 'bg-indigo-50 dark:bg-indigo-800 dark:bg-opacity-20' : 'bg-white dark:bg-gray-700 dark:bg-opacity-20'
        }   `}
      key={word.name}
      onClick={handlePlay}
    >
      <div className="flex-1">
        <p className={`select-all font-mono  ${isMobile ? 'text-[1rem]' : 'text-xl'} font-normal leading-6 dark:text-gray-50`}>
          {['romaji', 'hapin'].includes(currentLanguage) ? word.notation : word.name}
        </p>
        <div className={`mt-2 max-w-sm font-sans ${isMobile ? 'text-[0.8rem]' : 'text-sm'} text-gray-400`}>{word.trans.join('；')}</div>
      </div>
      <WordPronunciationIcon word={word} lang={currentLanguage} className={`${isMobile ? 'h-6 w-6' : 'h-8 w-8'}`} ref={wordPronunciationIconRef} />
    </div>
  )
}
