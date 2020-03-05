import marked from 'marked'
import { ssmlMarked } from './ssmlMarked'

export interface iMarkdownToSsmlOptions {
  debug?: boolean
  split?: boolean
}

export const markdownToSsml = (markdown: string, options?: iMarkdownToSsmlOptions): string[] => {
  const defaultOptions = {
    debug: false,
    split: true
  }
  const setting = Object.assign(defaultOptions, options)

  const parser = ssmlMarked()

  // Markdown を分割する
  let splitMarkdowns = [markdown]
  if (setting.split) {
    const temporary = markdown.replace(/^#/mg, '{{split}}#')
    splitMarkdowns = temporary.split(`{{split}}`).filter(
      splitMarkdown => {
        return splitMarkdown.replace(/[\r\n\s　]/, '').length !== 0
      }
    )
  }
  setting.debug && console.log('debug 28', splitMarkdowns)

  // SSML に 変換する
  const splitSsml = splitMarkdowns.map(
    (markdown, index) => {
      return parser(markdown)
    }
  )
  setting.debug && console.log('debug 36', splitSsml)

  return splitSsml
}