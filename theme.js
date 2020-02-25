"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const buildinTheme = {
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
};
const getTheme = (themeName) => {
    const fixThemeName = themeName ? themeName : 'default';
    return buildinTheme[fixThemeName];
};
exports.getThemeElm = (elem, themeName) => {
    const theme = getTheme(themeName);
    return theme[elem];
};
