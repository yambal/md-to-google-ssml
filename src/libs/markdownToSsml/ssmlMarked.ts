import marked, { Slugger } from 'marked'
import prettyData from 'pretty-data'
import { getThemeElm, tThemeName, iAudio } from '../theme'
import { isSingleton } from 'music-metadata/lib/common/GenericTagTypes'

/**
 * 
 */
interface iSsmlMarked {
  themeName?: tThemeName
  paragraphBreak?: string
  brBreak?: string
}

interface iSsmlMarkedMethod {
  parse: (matkdown: string) => string
  buildHeader: (title?: string, description?: string, subTitle?: string, subDescription?: string) => string | null
  buildFooter: (Conclusion?: string, closing?: string) => string | null
}

export const ssmlMarked = (options? :iSsmlMarked): iSsmlMarkedMethod => {
  const defaultOptions: iSsmlMarked = {
    themeName: 'default',
    paragraphBreak: '1.5s',
    brBreak: '0.75s'
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
  const getBgmStartElm = (elementName: string, isRandom?: boolean) => {
    const closer = getBgmEndElm()
    boxElementId = makeId(4, ssmlIndex)
    bgmAudio = getElementAudio(elementName, isRandom)
    return `${closer}<par><media xml:id="${boxElementId}" begin="${bgmAudio.begin}">`
  }

  const getBgmEndElm = ():string => {
    if (!!boxElementId.length && bgmAudio) {
      const closer = `</media>`
        + `<media end="${boxElementId}.end${bgmAudio.end}" fadeOutDur="${bgmAudio.fadeOut}" repeatCount="${bgmAudio.loop ? '99' : '1'}" soundLevel="${bgmAudio.soundLevel}">`
        + `<audio src="${bgmAudio.url}" /></media></par>`
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
    if (leval <= 3) {
      return `${getBgmStartElm('heading')}<p>${text}</p>${getBgmEndElm()}`
    }

    const id = makeId(4)
    const audio = getElementAudio('heading')
    return `<par>`
      + `<media xml:id="${id}" begin="${audio.begin}"><p>${text}</p></media>`
      + `<media end="${id}.end${audio.end}" fadeOutDur="${audio.fadeOut}" repeatCount="${audio.loop ? '99' : '1'}" soundLevel="${audio.soundLevel}">`
      + `<audio src="${audio.url}" /></media>`
      + `</par>`
  }

  ssmlRenderer.blockquote = (text: string) => {
    return `${getBgmStartElm('blockquote', true)}<p>${text}</p>${getBgmEndElm()}`
  }

  // P
  ssmlRenderer.paragraph = (text: string) => {
    // BGM が設定されていなければ BGM を開始する
    // BGM が設定されていれば何も（閉じも）しない
    return `${getBgmStartElmIfNoBgm('paragraph')}<p><s>${text}</s></p><break time="${setting.paragraphBreak}"/>`
  }

  ssmlRenderer.hr = () => {
    const audio = getElementAudio('hr')
    boxElementId = makeId(4, ssmlIndex)
    const ssml = ``
      + `<par>`
      + `<media xml:id="${boxElementId}" begin="${audio.begin}"><break time="0.25s"/></media>`
      + `<media end="${boxElementId}.end${audio.end}" fadeOutDur="${audio.fadeOut}"><audio src="${audio.url}" /></media>`
      + `</par>`
    return ssml
  }

  ssmlRenderer.list = function(body: string, ordered: boolean, start: number) {
    return `${body}`
  }

  // LI
  ssmlRenderer.listitem = function (text: string) {
    const id = makeId(4)
    const audio = getElementAudio('listitem')
    const ssml = ``
      + `<par>`
      + `<media xml:id="${id}" begin="${audio.begin}">${text}<break time="2s"/></media>`
      + `<media><audio src="${audio.url}" /></media>`
      + `</par>`
    return ssml
  }

  // inline =============================================
  // BR
  ssmlRenderer.br = function () {
    return `</s><break time="${setting.brBreak}"/><s>`
  }

  // LINK
  ssmlRenderer.link = function (href: string, title: string, text: string) {
    const audio = getElementAudio('link')
    boxElementId = makeId(4, ssmlIndex)
    const ssml = ``
      + `<par>`
      + `<media xml:id="${boxElementId}" begin="${audio.begin}">${text}</media>`
      + `<media end="${boxElementId}.end${audio.end}" fadeOutDur="${audio.fadeOut}"><audio src="${audio.url}" /></media>`
      + `</par>`
    return ssml
  }

  // Strong
  ssmlRenderer.strong = function (text: string) {
    return `<break time="0.25s"/><emphasis level="strong"><prosody rate="slow">${text}</prosody></emphasis><break time="0.25s"/>`
  }

  // EM
  ssmlRenderer.em = function (text: string) {
    return `<break time="0.25s"/><emphasis level="strong"><prosody rate="slow">${text}</prosody></emphasis><break time="0.25s"/>`
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
    buildHeader: (title?: string, description?: string, subTitle?: string, subDescription?: string) => {
      if (title || description) {
        boxElementId = makeId(4, ssmlIndex)
        const audio = getElementAudio('opening', true)

        const hasTitle =  title && title.length !== 0
        const hasDescription =  description && description.length !== 0
        const hasHeader = hasTitle || hasDescription

        const hasSubTitle =  subTitle && subTitle.length !== 0
        const hasSubDescription =  subDescription && subDescription.length !== 0
        const hasSubHeader = hasSubTitle || hasSubDescription

        let ssml = `<speak>`
          + `<par>`
          + `<media xml:id="${boxElementId}" begin="${audio.begin}">`
        
        // Title & Description
        if (hasHeader) {
          ssml += `<p>`
        }
        if (hasTitle) {
          ssml += `<s><emphasis level="strong"><prosody rate="slow">${title}</prosody></emphasis></s>`
        }
        if (hasTitle && hasDescription) {
          ssml += `<break time="2s"/>`
        }
        if (hasDescription) {
          ssml += `<s>${description}</s>`
        }
        if (hasHeader) {
          ssml += `</p>`
        }

        if (hasHeader && hasSubHeader) {
          ssml += `<break time="3s"/>`
        }

        // Sub Title & Sub Description
        if (hasSubHeader) {
          ssml += `<p>`
        }
        if (hasSubTitle) {
          ssml += `<s><emphasis level="strong"><prosody rate="slow">${subTitle}</prosody></emphasis></s>`
        }
        if (hasSubTitle && hasSubDescription) {
          ssml += `<break time="2s"/>`
        }
        if (hasSubDescription) {
          ssml += `<s>${subDescription}</s>`
        }
        if (hasSubHeader) {
          ssml += `</p>`
        }

        ssml += `</media>`

        ssml += `<media end="${boxElementId}.end${audio.end}" fadeOutDur="${audio.fadeOut}" soundLevel="${audio.soundLevel}"><audio src="${audio.url}" /></media>`
          + `</par>`
          + `<break time="2s"/>`
          + `</speak>`

        return ssml
      }
      return null
    },
    buildFooter : (conclusion?: string, closing?: string) => {
      if (conclusion || closing) {
        boxElementId = makeId(4, ssmlIndex)
        const audio = getElementAudio('closing', true)

        const hasConclusion=  conclusion && conclusion.length !== 0
        const hasClosing =  closing && closing.length !== 0

        let ssml = `<speak>`
          + `<par>`
          + `<media xml:id="${boxElementId}" begin="${audio.begin}">`

        if (hasConclusion) {
          ssml += `<p>${conclusion}</p>`
        }

        if (hasConclusion && hasClosing) {
          ssml += `<break time="2s"/>`
        }

        if (hasClosing) {
          ssml += `<p>${closing}</p>`
        }

        ssml += `</media>`

        ssml += `<media end="${boxElementId}.end${audio.end}" fadeOutDur="${audio.fadeOut}" soundLevel="${audio.soundLevel}"><audio src="${audio.url}" /></media>`
          + `</par>`
          + `</speak>`

        return ssml
      }
      return null
    }
  }
}