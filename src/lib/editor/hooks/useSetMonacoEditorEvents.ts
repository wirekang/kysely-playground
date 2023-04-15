import { editor } from "monaco-editor"
import { useCallback, useEffect, useState } from "react"
import { RecoilState, useRecoilState } from "recoil"
import { MonacoEditorEvents } from "src/lib/editor/types/MonacoEditorEvents"
import { EditorUtils } from "src/lib/editor/EditorUtils"
import { LogUtils } from "src/lib/log/LogUtils"

export function useSetMonacoEditorEvents(
  state: RecoilState<MonacoEditorEvents | null>,
  valueState: RecoilState<string>
) {
  const [, setEvents] = useRecoilState(state)
  const [value, setValue] = useRecoilState(valueState)
  const [editor, setEditor] = useState<editor.IStandaloneCodeEditor>()
  const [init, setInit] = useState(false)

  const onMount = useCallback(
    (editor: editor.IStandaloneCodeEditor) => {
      setEditor(editor)
    },
    [setEditor]
  )

  useEffect(() => {
    if (!editor) {
      return
    }

    const model = editor.getModel()!
    setEvents({
      triggerEvent: (handlerId, payload) => {
        editor.trigger(null, handlerId, payload)
      },
      setValue: (value) => {
        const selection = editor.getSelection()
        model.setValue(value)
        setValue(value)
        if (selection === null) {
          return
        }
        editor.setSelection(selection)
      },
      refresh: () => {
        model.setValue(model.getValue())
      },
    })
    model.onDidChangeContent((e) => {
      setValue(model.getValue())
      if (EditorUtils.shouldTriggerSuggest(e.changes)) {
        setTimeout(() => {
          editor.trigger(null, "editor.action.triggerSuggest", null)
        }, 200)
      }
    })
  }, [editor, setEvents, setValue])

  useEffect(() => {
    if (init || !editor) {
      return
    }
    setInit(true)
    const model = editor.getModel()!
    model.setValue(value)
  }, [editor, value, init, setInit])

  return onMount
}
