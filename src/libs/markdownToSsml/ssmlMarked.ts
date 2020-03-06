import marked, { Slugger } from 'marked'
import prettyData from 'pretty-data'
import { getThemeElm, tThemeName, iAudio } from '../theme'

/**
 * 
 */
interface iSsmlMarked {
  themeName?: tThemeName
}

interface iSsmlMarkedMethod {
  parse: (matkdown: string) => string
  buildHeader: (title?: string, description?: string) => string | null
}

export const ssmlMarked = (options? :iSsmlMarked): iSsmlMarkedMethod => {
  const defaultOptions: iSsmlMarked = {
    themeName: 'default'
  }
  const setting = Object.assign(defaultOptions, options)

  const ssmlRenderer = new marked.Renderer()

  let idIndex = 0
  let ssmlIndex: number = 0
  let boxElementId: string = ''
  let bgmAudio: iAudio | null = null

  // ID =============================================
  const makeId = (length: number, index?: number) => {
    var S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    
    let prefixA = ''
    if (typeof index !== 'undefined' && index >= 0) {
      prefixA = S.substr(index % S.length, 1)
    }

    const prefixB = S.substr(idIndex % S.length, 1)
    idIndex++

    const base = Array.from(Array(length)).map(()=>S[Math.floor(Math.random()*S.length)]).join('') + prefixA + prefixB
    return base.slice(-length)
  }

  // BGM =============================================
  // 
  const getBgmStartElm = (elementName: string) => {
    const closer = getBgmEndElm()
    boxElementId = makeId(4, ssmlIndex)
    bgmAudio = getElementAudio(elementName)
    return `${closer}<par><media xml:id="${boxElementId}" begin="${bgmAudio.begin}">`
  }

  const getBgmEndElm = ():string => {
    if (!!boxElementId.length && bgmAudio) {
      const closer = `</media><media end="${boxElementId}.end${bgmAudio.end}" fadeOutDur="${bgmAudio.fadeOut}"><audio src="${bgmAudio.url}" /></media></par>`
      boxElementId = ''
      bgmAudio = null
      return closer
    }
    return ''
  }

  const getBgmStartElmIfNoBgm = (elementName: string) => {
    if (!boxElementId.length && !bgmAudio) {
      return getBgmStartElm(elementName)
    }
    return ''
  }

  const getElementAudio = (elementName: string, isRandom?: boolean) => {
    const audios = getThemeElm(elementName, setting.themeName).audios
    let i = ssmlIndex
    if (isRandom) {
      i = Math.floor( Math.random() * (100 - audios.length) ) + audios.length ;
    }
    const audio = audios[i % audios.length]
    return audio
  }

  // block =============================================
  ssmlRenderer.heading = (text: String, leval: Number, raw: String, slugger: Slugger) => {
    return `${getBgmStartElm('heading')}<p>${text}</p>${getBgmEndElm()}`
  }

  ssmlRenderer.blockquote = (text: string) => {
    return `${getBgmStartElm('blockquote')}<p>${text}</p>${getBgmEndElm()}`
  }

  // P
  ssmlRenderer.paragraph = (text: string) => {
    // BGM が設定されていなければ BGM を開始する
    // BGM が設定されていれば何も（閉じも）しない
    return `${getBgmStartElmIfNoBgm('paragraph')}<p><s>${text}</s></p>`
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

  return {
    parse: (markdown: string) => {
      idIndex = 0
      boxElementId = ''

      let persed = marked(markdown, { renderer: ssmlRenderer }).replace(/<s><\/s>/g, '')
      persed = `<speak>${persed}${getBgmEndElm()}</speak>`

      ssmlIndex ++
      boxElementId = ''

      return prettyData.pd.xmlmin(persed, true)
    },
    buildHeader: (title?: string, description?: string) => {
      if (title || description) {
        boxElementId = makeId(4, ssmlIndex)
        const audio = getElementAudio('opening', true)

        let ssml = `<speak>`
          + `<par>`
          + `<media xml:id="${boxElementId}" begin="${audio.begin}">`
        
        if (title && title.length !== 0) {
          ssml += `<p>${title}</p>`
        }
        if (title && title.length !== 0 && description && description.length !== 0) {
          ssml += `<break time="3s"/>`
        }
        if (description && description.length !== 0) {
          ssml += `<p>${description}</p>`
        }
        ssml += `</media>`

        ssml += `<media end="${boxElementId}.end${audio.end}" fadeOutDur="${audio.fadeOut}"><audio src="${audio.url}" /></media>`
          + `</par>`
          + `</speak>`
        
        return ssml
      }
      return null
    }
  }
}