export type tThemeName = 'default'
export interface iAudio {
  url: string
  begin: string
  end: string
  fadeOut: string
}
interface iThemeElm {
  audios: iAudio[]
}
interface iTheme {[key: string]: iThemeElm}

interface iThemes {[key:string]: iTheme} 

const buildinTheme:iThemes  = {
  default: {
    opening: {
      audios:[
        {
          url: 'https://yambal.github.io/md-to-google-ssml/audio/Electronic-G-M-01.mp3',
          begin: '8s',
          end: '+8s',
          fadeOut: '3s'
        },
        {
          url: 'https://yambal.github.io/md-to-google-ssml/audio/Electronic-G-M-02.mp3',
          begin: '4s',
          end: '+3s',
          fadeOut: '3s'
        },
        {
          url: 'https://yambal.github.io/md-to-google-ssml/audio/Electronic-G-M-03.mp3',
          begin: '4s',
          end: '+3s',
          fadeOut: '3s'
        },
        {
          url: 'https://yambal.github.io/md-to-google-ssml/audio/Electronic-G-M-04.mp3',
          begin: '4s',
          end: '+3s',
          fadeOut: '3s'
        }
      ]
    },
    heading: {
      audios: [
        {
        url: 'https://yambal.github.io/md-to-google-ssml/audio/Jazz-P-M-01.mp3',
        begin: '2s',
        end: '+3s',
        fadeOut: '3s'
        }
      ]
    },
    blockquote: {
      audios: [
        {
        url: 'https://yambal.github.io/md-to-google-ssml/audio/Jazz-P-M-01.mp3',
        begin: '2s',
        end: '+3s',
        fadeOut: '3s'
        }
      ]
    },
    paragraph: {
      audios: [
        {
        url: 'https://yambal.github.io/md-to-google-ssml/audio/Jazz-P-M-01.mp3',
        begin: '2s',
        end: '+3s',
        fadeOut: '3s'
        },
        {
          url: 'https://yambal.github.io/md-to-google-ssml/audio/Jazz-P-M-02.mp3',
          begin: '2s',
          end: '+3s',
          fadeOut: '3s'
        },
        {
          url: 'https://yambal.github.io/md-to-google-ssml/audio/Jazz-P-M-03.mp3',
          begin: '2s',
          end: '+3s',
          fadeOut: '3s'
        },
        {
          url: 'https://yambal.github.io/md-to-google-ssml/audio/Jazz-P-M-04.mp3',
          begin: '2s',
          end: '+3s',
          fadeOut: '3s'
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

