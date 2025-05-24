import { LoadingWordUI } from './LoadingWordUI'
import useGetWord from './hooks/useGetWord'
import { currentRowDetailAtom } from './store'
import type { groupedWordRecords } from './type'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { idDictionaryMap } from '@/resources/dictionary'
import { recordErrorBookAction } from '@/utils'
import { useSetAtom } from 'jotai'
import type { FC } from 'react'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import DeleteIcon from '~icons/weui/delete-filled'

type IErrorRowProps = {
  record: groupedWordRecords
  onDelete: () => void
  onWordUpdate: (word: any) => void
}

const ErrorRow: FC<IErrorRowProps> = ({ record, onDelete, onWordUpdate }) => {
  const setCurrentRowDetail = useSetAtom(currentRowDetailAtom)
  const dictInfo = idDictionaryMap[record.dict]
  const { word, isLoading, hasError } = useGetWord(record.word, dictInfo)
  const prevWordRef = useRef<any>()
  const stableWord = useMemo(() => word, [word])

  const onClick = useCallback(() => {
    setCurrentRowDetail(record)
    recordErrorBookAction('detail')
  }, [record, setCurrentRowDetail])

  useEffect(() => {
    if (stableWord && stableWord !== prevWordRef.current) {
      onWordUpdate(stableWord)
      prevWordRef.current = stableWord
    }
  }, [stableWord, onWordUpdate])

  return (
    <li
      className="opacity-85 relative flex flex-col xl:flex-row w-full cursor-pointer items-start xl:items-center justify-between rounded-lg bg-white px-3 xl:px-6 py-3 text-black shadow-md dark:bg-gray-800 dark:text-white"
      onClick={onClick}
    >
      <span className="basis-2/12 break-normal">{record.word}</span>
      <span className="basis-6/12 break-normal text-xs xl:text-base">
        {word ? word.trans.join('；') : <LoadingWordUI isLoading={isLoading} hasError={hasError} />}
      </span>
      <span className="basis-1/12 break-normal pl-0 xl:pl-8 text-xs xl:text-base">
        <span className="text-xs xl:text-base xl:hidden text-gray-400">错误次数: </span>
        {record.wrongCount}</span>
      <span className="basis-1/12 break-normal pl-0 xl:pl-0 text-xs xl:text-base">
        <span className="text-xs xl:text-base xl:hidden text-gray-400">词典: </span>
        {dictInfo?.name}</span>
      <span
        className="xl:basis-1/12 xl:break-normal absolute xl:basis-auto right-2 top-1/2 -translate-y-1/2 "
        onClick={(e) => {
          e.stopPropagation()
          onDelete()
        }}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DeleteIcon />
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete Records</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </span>
    </li>
  )
}

export default ErrorRow
