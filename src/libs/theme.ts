export type tThemeName = 'default'
export interface iAudio {
  url: string
  begin: string
  end: string
  fadeOut: string
  loop: boolean
  soundLevel: string
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
          fadeOut: '3s',
          loop: true,
          soundLevel : '+0dB'
        },
        {
          url: 'https://yambal.github.io/md-to-google-ssml/audio/Electronic-G-M-02.mp3',
          begin: '4s',
          end: '+3s',
          fadeOut: '3s',
          loop: true,
          soundLevel : '+0dB'
        },
        {
          url: 'https://yambal.github.io/md-to-google-ssml/audio/Electronic-G-M-03.mp3',
          begin: '4s',
          end: '+3s',
          fadeOut: '3s',
          loop: true,
          soundLevel : '+0dB'
        },
        {
          url: 'https://yambal.github.io/md-to-google-ssml/audio/Electronic-G-M-04.mp3',
          begin: '4s',
          end: '+3s',
          fadeOut: '3s',
          loop: true,
          soundLevel : '+0dB'
        }
      ]
    },
    closing: {
      audios:[
        {
          url: 'https://yambal.github.io/md-to-google-ssml/audio/Electronic-G-M-01.mp3',
          begin: '8s',
          end: '+8s',
          fadeOut: '3s',
          loop: true,
          soundLevel : '+0dB'
        },
        {
          url: 'https://yambal.github.io/md-to-google-ssml/audio/Electronic-G-M-02.mp3',
          begin: '4s',
          end: '+3s',
          fadeOut: '3s',
          loop: true,
          soundLevel : '+0dB'
        },
        {
          url: 'https://yambal.github.io/md-to-google-ssml/audio/Electronic-G-M-03.mp3',
          begin: '4s',
          end: '+3s',
          fadeOut: '3s',
          loop: true,
          soundLevel : '+0dB'
        },
        {
          url: 'https://yambal.github.io/md-to-google-ssml/audio/Electronic-G-M-04.mp3',
          begin: '4s',
          end: '+3s',
          fadeOut: '3s',
          loop: true,
          soundLevel : '+0dB'
        }
      ]
    },
    heading: {
      audios: [
        {
        url: 'https://yambal.github.io/md-to-google-ssml/audio/Accent-01.mp3',
        begin: '1s',
        end: '+2s',
        fadeOut: '2s',
        loop: false,
        soundLevel : '+0dB'
        }
      ]
    },
    blockquote: {
      audios: [
        {
          url: 'https://yambal.github.io/md-to-google-ssml/audio/MChinematic-P-M-01.mp3',
          begin: '4s',
          end: '+5s',
          fadeOut: '3s',
          loop: true,
          soundLevel : '-10dB'
        },
        {
          url: 'https://yambal.github.io/md-to-google-ssml/audio/MChinematic-P-M-02.mp3',
          begin: '4s',
          end: '+5s',
          fadeOut: '3s',
          loop: true,
          soundLevel : '-10dB'
        },
        {
          url: 'https://yambal.github.io/md-to-google-ssml/audio/MChinematic-P-M-03.mp3',
          begin: '4s',
          end: '+5s',
          fadeOut: '3s',
          loop: true,
          soundLevel : '-10dB'
        },
        {
          url: 'https://yambal.github.io/md-to-google-ssml/audio/MChinematic-P-M-04.mp3',
          begin: '4s',
          end: '+5s',
          fadeOut: '3s',
          loop: true,
          soundLevel : '-10dB'
        }
      ]
    },
    paragraph: {
      audios: [
        {
          url: 'https://yambal.github.io/md-to-google-ssml/audio/Electronic-A-M-01.mp3',
          begin: '2s',
          end: '+3s',
          fadeOut: '3s',
          loop: true,
          soundLevel : '-10dB'
        },
        {
          url: 'https://yambal.github.io/md-to-google-ssml/audio/Electronic-A-M-02.mp3',
          begin: '2s',
          end: '+3s',
          fadeOut: '3s',
          loop: true,
          soundLevel : '-10dB'
        },
        {
          url: 'https://yambal.github.io/md-to-google-ssml/audio/Electronic-A-M-03.mp3',
          begin: '2s',
          end: '+3s',
          fadeOut: '3s',
          loop: true,
          soundLevel : '-10dB'
        },
        {
          url: 'https://yambal.github.io/md-to-google-ssml/audio/Electronic-A-M-04.mp3',
          begin: '2s',
          end: '+3s',
          fadeOut: '3s',
          loop: true,
          soundLevel : '-10dB'
        }
      ]
    },
    hr: {
      audios: [
        {
          url: 'https://yambal.github.io/md-to-google-ssml/audio/PageFlip-01.mp3',
          begin: '1s',
          end: '+3s',
          fadeOut: '0s',
          loop: false,
          soundLevel : '+0dB'
        }
      ]
    },
    link: {
      audios: [
        {
          url: 'https://yambal.github.io/md-to-google-ssml/audio/WClick-01.mp3',
          begin: '1s',
          end: '+0s',
          fadeOut: '0s',
          loop: false,
          soundLevel : '+0dB'
        }
      ]
    },
    listitem: {
      audios: [
        {
          url: 'https://yambal.github.io/md-to-google-ssml/audio/ListItem-01.mp3',
          begin: '0.5s',
          end: '',
          fadeOut: '0s',
          loop: false,
          soundLevel : '+0dB'
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

