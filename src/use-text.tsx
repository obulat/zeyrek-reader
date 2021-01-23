import * as React from 'react';
import {useEffect, useState} from "react";
import {WordDefinitions} from './components/Reader'


const defaultText = `KÜRK MANTOLU MADONNA
Şimdiye kadar tesadüf ettiğim insanlardan bir tanesi benim üzerimde belki en büyük tesiri yapmıştır. Aradan aylar geçtiği halde bir türlü bu tesirden kurtulamadım. Ne zaman kendimle baş başa kalsam, Raif efendinin saf yüzü, biraz dünyadan uzak, buna rağmen bir insana tesadüf ettikleri zaman tebessüm etmek isteyen bakışları gözlerimin önünde canlanıyor.
`

type TextProviderProps = {
  children?: React.ReactNode,
  text: string,
  uploadText: (text: string) => void,
  textData: WordDefinitions[][] | []
}

export const textContext = React.createContext<Partial<TextProviderProps>>({})

export function ProvideText(
    { children }: {children: React.ReactNode}
    ): JSX.Element {
  const text = useProvideText();
  return <textContext.Provider value={text}>{children}</textContext.Provider>
}

export function useText():Partial<TextProviderProps> {
  return React.useContext(textContext);
}


function useProvideText() {
  const [text, setText] = React.useState<string>(defaultText);
  const [textKey, setTextKey] = React.useState<'default' | 'user'>('default')
  const [textData, setTextData] = useState<WordDefinitions[][] | []>([])

  useEffect(() => {
    const storedTextData = localStorage.getItem(`${textKey}-text`)
    if (textKey == 'default' && storedTextData) {
      setTextData(JSON.parse(storedTextData));
    } else {
      fetch('https://serene-lake-52519.herokuapp.com/annotate_text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text })
      })
          .then(response => response.json())
          .then(data => {
            setTextData(data)
            localStorage.setItem(`${textKey}-text`, JSON.stringify(data))
          })
    }
  }, [text])

  function uploadText(text: string) {
    setTextKey('user')
    setText(text)
  }

  return {
    text,
    uploadText,
    textData
  }
}
