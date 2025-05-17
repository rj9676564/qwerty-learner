import { RadioGroup } from '@headlessui/react'
import { useCallback } from 'react'

type Props = {
  tagList: string[]
  currentTag: string
  onChangeCurrentTag: (tag: string) => void
}

export default function DictTagSwitcher({ tagList, currentTag, onChangeCurrentTag }: Props) {
  const onChangeTag = useCallback(
    (tag: string) => {
      onChangeCurrentTag(tag)
    },
    [onChangeCurrentTag],
  )

  return (
    <RadioGroup value={currentTag} onChange={onChangeTag}>
      {/* 横向滚动  */}
      <div className="flex items-center space-x-4 max-w-full flex-wrap overflow-x-auto space-y-2">
        {tagList.map((option) => (
          <RadioGroup.Option
            key={option}
            value={option}
            className={({ checked }) =>
              `cursor-pointer !ml-2 !mt-0 whitespace-nowrap rounded-[3rem] px-2 py-1 lg:px-4 lg:py-2 ${checked ? 'bg-indigo-400 text-white' : 'bg-white text-gray-600 dark:bg-gray-800 dark:text-gray-200'
              } ${!checked && 'hover:bg-indigo-100 dark:hover:bg-gray-600'}`
            }
          >
            <p className={`font-normal `}>{option}</p>
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}
