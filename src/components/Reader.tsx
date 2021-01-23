import React, { useState} from 'react'
import {SelectedWordDefinitions} from "./SelectedWordDefinitions";
import { useText } from '../use-text';


export interface LookUpHistory {
  [key: string]: number
}

export interface WordMeaning {
  id: number,
  meaning: string,
  pos: string
}

export type WordMeanings = {
  [key: string] : WordMeaning[]
}

export interface WordDefinitions {
  id: number,
  word: string,
  meanings: WordMeanings[]
}


function Reader ({readerRef}: {
  readerRef: React.RefObject<HTMLDivElement>
}): React.ReactElement {
  const {textData} = useText();

  const [definitions, setDefinitions] = useState<WordDefinitions | null>(null)
  const [activeWord, setActiveWord] = useState<string | null>(null)
  const [lookupHistory, setLookupHistory] = useState<LookUpHistory>({})

  React.useEffect(() => {
    if (definitions) {
      const word = definitions
      let newHistory;
      if (word.word in lookupHistory) {
        newHistory = {...lookupHistory, [word.word] : lookupHistory[word.word] + 1 }
      } else {
        newHistory = {...lookupHistory, [word.word]: 1}
      }
      setLookupHistory(newHistory)
      localStorage.setItem('lookupHistory', JSON.stringify(newHistory))
    }
  } , [activeWord])

  function handleSpanClick(paragraphNo: number, wordIdOneBasedIndex: number, cName: string) {
    setActiveWord(cName)
    if (textData) {
      const word: WordDefinitions = textData[paragraphNo][wordIdOneBasedIndex - 1];
      setDefinitions(word);
    }
  }
  const isPunctuation = (str: string) => (['.', ',', '!'].includes(str))

  return (
    <section className="reader" ref={readerRef}>
      <div className="text-container">
        <div className="text">
            {textData && (textData as WordDefinitions[][]).map((paragraph: WordDefinitions[], idx: number) => (
                <p key={idx}>
                  {paragraph && paragraph.map(d => {
                    const currentWord = `${idx}-${d.id}`
                    return activeWord === currentWord
                        ? (
                            <span key={d.id}
                                 className={`span-${currentWord} active`}
                                 >
                              {d.word}
                            </span>
                        ) : (
                            <span key={d.id}
                            className={`span-${idx}-${d.id}${isPunctuation(d.word)
                                ? " punctuation"
                                : ""}`}
                            onClick={() => handleSpanClick(idx, d.id, `${idx}-${d.id}`)}>{d.word}</span>
                        )
                  })
                  }
                </p>
            ))}
        </div>

      </div>
      {
        definitions && <SelectedWordDefinitions definitions={definitions} />
      }
    </section>
  )
}

export default Reader;
