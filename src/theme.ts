export type tThemeName = 'default'
export interface iAudio {
  url: string
  begin: string
  end: string
}
interface iThemeElm {
  audio: iAudio[]
}
interface iTheme {[key: string]: iThemeElm}

interface iThemes {[key:string]: iTheme} 

const buildinTheme:iThemes  = {
  default: {
    header: {
      audio: [
        {
        url: 'hedaer.mp3',
        begin: '0s',
        end: '+2s'
        }
      ]
    },
    blockquote: {
      audio: [
        {
        url: 'blockquote.mp3',
        begin: '0s',
        end: '+2s'
        }
      ]
    },
    paragraph: {
      audio: [
        {
        url: 'paragraph.mp3',
        begin: '0s',
        end: '+2s'
        }
      ]
    }
  }
}

const getTheme = (themeName?: tThemeName):iTheme  => {
  const fixThemeName = themeName ? themeName : 'default'
  return buildinTheme[fixThemeName]
}

export const getThemeElm = (elem: string, themeName?: tThemeName):iThemeElm => {
  const theme = getTheme(themeName)
  return theme[elem]
}

