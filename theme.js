"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const buildinTheme = {
    default: {
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
};
const getTheme = (themeName) => {
    const fixThemeName = themeName ? themeName : 'default';
    return buildinTheme[fixThemeName];
};
exports.getThemeElm = (elem, themeName) => {
    const theme = getTheme(themeName);
    return theme[elem];
};
