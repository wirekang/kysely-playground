export type MonacoEditorEvents = {
  setValue: (value: string) => void
  triggerEvent: (handlerId: string, payload: any) => void
  refresh: () => void
}
