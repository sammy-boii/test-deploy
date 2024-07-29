import './simple-image.css'
import './customTools/extraCues/extra-cues.css'
import './customTools/MCQs/MCQs.css'
import './customTools/FillInTheBlanks/FillInTheBlanks.css'

import EditorJS, { OutputData } from '@editorjs/editorjs'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'

import { EDITOR_JS_TOOLS } from './tools'

const Editorjs = ({
  content,
  setContent
}: {
  content: OutputData
  setContent: Dispatch<SetStateAction<OutputData>>
}) => {
  const ejInstance = useRef<EditorJS>()
  const initEditor = () => {
    const editor = new EditorJS({
      holder: 'editor',
      data: content,

      onReady: () => {
        ejInstance.current = editor
      },

      placeholder: 'Write your blog here',
      onChange: async () => {
        const content = await editor.saver.save()
        setContent(content)
      },
      //@ts-ignore
      tools: EDITOR_JS_TOOLS
    })
  }

  // This useEffect is for preventing multiple instances of editorjs rendering in the display.
  useEffect(() => {
    if (ejInstance.current === undefined) {
      initEditor()
    }

    return () => {
      ejInstance?.current?.destroy()
      ejInstance.current = undefined
    }
  }, [])

  return (
    <>
      <div id={'editor'}></div>
    </>
  )
}

export default Editorjs
