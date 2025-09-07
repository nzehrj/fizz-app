declare module 'react-markdown-editor-lite' {
  import * as React from 'react'

  export interface EditorChange {
    text: string
    html: string
  }

  export interface ToolbarConfig {
    bold?: boolean
    italic?: boolean
    underline?: boolean
    strikeThrough?: boolean
    title?: boolean
    link?: boolean
    listOrdered?: boolean
    listUnordered?: boolean
    blockQuote?: boolean
    code?: boolean
    table?: boolean
    image?: boolean
    fullScreen?: boolean
    htmlPreview?: boolean
  }

  export interface MdEditorProps {
    value?: string
    style?: React.CSSProperties
    renderHTML?: (text: string) => React.ReactNode
    onChange?: (change: EditorChange) => void
    config?: {
      view?: {
        menu?: boolean
        md?: boolean
        html?: boolean
      }
      canView?: ToolbarConfig
    }
  }

  export default class MdEditor extends React.Component<MdEditorProps> {}
}
