"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const buildinTheme = {
    default: {
        opening: {
            audios: [
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
                    url: 'https://yambal.github.io/md-to-google-ssml/audio/Accent-01.mp3',
                    begin: '1s',
                    end: '+2s',
                    fadeOut: '2s'
                }
            ]
        },
        blockquote: {
            audios: [
                {
                    url: 'https://yambal.github.io/md-to-google-ssml/audio/MChinematic-P-M-01.mp3',
                    begin: '2s',
                    end: '+3s',
                    fadeOut: '3s'
                },
                {
                    url: 'https://yambal.github.io/md-to-google-ssml/audio/MChinematic-P-M-02.mp3',
                    begin: '2s',
                    end: '+3s',
                    fadeOut: '3s'
                },
                {
                    url: 'https://yambal.github.io/md-to-google-ssml/audio/MChinematic-P-M-03.mp3',
                    begin: '2s',
                    end: '+3s',
                    fadeOut: '3s'
                },
                {
                    url: 'https://yambal.github.io/md-to-google-ssml/audio/MChinematic-P-M-04.mp3',
                    begin: '2s',
                    end: '+3s',
                    fadeOut: '3s'
                }
            ]
        },
        paragraph: {
            audios: [
                {
                    url: 'https://yambal.github.io/md-to-google-ssml/audio/Electronic-A-M-01.mp3',
                    begin: '2s',
                    end: '+3s',
                    fadeOut: '3s'
                },
                {
                    url: 'https://yambal.github.io/md-to-google-ssml/audio/Electronic-A-M-02.mp3',
                    begin: '2s',
                    end: '+3s',
                    fadeOut: '3s'
                },
                {
                    url: 'https://yambal.github.io/md-to-google-ssml/audio/Electronic-A-M-03.mp3',
                    begin: '2s',
                    end: '+3s',
                    fadeOut: '3s'
                },
                {
                    url: 'https://yambal.github.io/md-to-google-ssml/audio/Electronic-A-M-04.mp3',
                    begin: '2s',
                    end: '+3s',
                    fadeOut: '3s'
                }
            ]
        },
        hr: {
            audios: [
                {
                    url: 'https://yambal.github.io/md-to-google-ssml/audio/PageFlip-01.mp3',
                    begin: '1s',
                    end: '+3s',
                    fadeOut: '3s'
                }
            ]
        }
    }
};
const getTheme = (themeName) => {
    const fixThemeName = themeName ? themeName : 'default';
    return buildinTheme[fixThemeName];
};
exports.getThemeElm = (elem, themeName) => {
    const theme = getTheme(themeName);
    return theme[elem];
};
