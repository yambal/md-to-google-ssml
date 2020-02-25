import marked, { Slugger } from 'marked'
import prettyData from 'pretty-data'
import { getThemeElm, tThemeName, iAudio } from './theme'

// ID =============================================
const makeId = (length: number, index?: number) => {
  var S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  let prefix = ''
  if (typeof index !== 'undefined' && index >= 0) {
    prefix = S.substr(index % S.length, 1)
  }
  const base = Array.from(Array(length)).map(()=>S[Math.floor(Math.random()*S.length)]).join('') + prefix
  return base.slice(-length)
}

/**
 * 
 */
interface iSsmlMarked {
  themeName?: tThemeName
}

export const ssmlMarked = (options? :iSsmlMarked): (matkdown: string, index: number) => string => {
  const defaultOptions: iSsmlMarked = {
    themeName: 'default'
  }
  const setting = Object.assign(defaultOptions, options)

  const ssmlRenderer = new marked.Renderer()

  let ssmlIndex: number
  let boxElementId: string = ''
  let bgmAudio: iAudio | null = null

  // BGM =============================================
  // 
  const getBgmStartElm = (audio: iAudio) => {
    const closer = getBgmEndElm()
    boxElementId = makeId(3, ssmlIndex)
    bgmAudio = audio
    return `${closer}<par><media xml:id="${boxElementId}">`
  }

  const getBgmEndElm = ():string => {
    if (!!boxElementId.length && bgmAudio) {
      const closer = `</media><media begin="${bgmAudio.begin}" end="${boxElementId}.eng${bgmAudio.end}"><audio url="${bgmAudio.url}" /></media></par>`
      boxElementId = ''
      bgmAudio = null
      return closer
    }
    return ''
  }

  const getBgmStartElmIfNoBgm = (audio: iAudio) => {
    if (!boxElementId.length && !bgmAudio) {
      return getBgmStartElm(audio)
    }
    return ''
  }

  // block =============================================
  ssmlRenderer.heading = (text: String, leval: Number, raw: String, slugger: Slugger) => {
    const audio = getThemeElm('header', setting.themeName).audio
    return `${getBgmStartElm(audio[0])}<p>${text}</p>${getBgmEndElm()}` //${getBgmStartElm('section.mp3')}`
  }

  ssmlRenderer.blockquote = (text: string) => {
    const audio = getThemeElm('blockquote', setting.themeName).audio
    return `${getBgmStartElm(audio[0])}<p>${text}</p>${getBgmEndElm()}`
  }

  // P
  ssmlRenderer.paragraph = (text: string) => {
    // BGM が設定されていなければ BGM を開始する
    // BGM が設定されていれば何も（閉じも）しない
    const audio = getThemeElm('paragraph', setting.themeName).audio
    return `${getBgmStartElmIfNoBgm(audio[0])}<p><s>${text}</s></p>`
  }

  // inline =============================================
  // BR
  ssmlRenderer.br = function () {
    return '</s><s>'
  }

  // Strong
  ssmlRenderer.strong = function (text: string) {
    return `</s><s>${text}</s><s>`
  }

  // EM
  ssmlRenderer.em = function (text: string) {
    return `</s><s>${text}</s><s>`
  }

  return (markdown: string, index?: number) => {
    ssmlIndex = typeof index !== 'undefined' ? index : -1
    boxElementId = ''

    let persed = marked(markdown, { renderer: ssmlRenderer }).replace(/<s><\/s>/g, '')
    persed = `${persed}${getBgmEndElm()}`
    
    ssmlIndex = -1
    boxElementId = ''

    return prettyData.pd.xmlmin(persed, true)
  }
}