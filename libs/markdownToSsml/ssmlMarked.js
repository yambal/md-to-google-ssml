"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const marked_1 = __importDefault(require("marked"));
const pretty_data_1 = __importDefault(require("pretty-data"));
const theme_1 = require("../theme");
exports.ssmlMarked = (options) => {
    const defaultOptions = {
        themeName: 'default'
    };
    const setting = Object.assign(defaultOptions, options);
    const ssmlRenderer = new marked_1.default.Renderer();
    let idIndex = 0;
    let ssmlIndex = 0;
    let boxElementId = '';
    let bgmAudio = null;
    // ID =============================================
    const makeId = (length, index) => {
        var S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let prefixA = '';
        if (typeof index !== 'undefined' && index >= 0) {
            prefixA = S.substr(index % S.length, 1);
        }
        const prefixB = S.substr(idIndex % S.length, 1);
        idIndex++;
        const base = Array.from(Array(length)).map(() => S[Math.floor(Math.random() * S.length)]).join('') + prefixA + prefixB;
        return base.slice(-length);
    };
    // BGM =============================================
    // 
    const getBgmStartElm = (elementName) => {
        const closer = getBgmEndElm();
        boxElementId = makeId(4, ssmlIndex);
        bgmAudio = getElementAudio(elementName);
        return `${closer}<par><media xml:id="${boxElementId}" begin="${bgmAudio.begin}">`;
    };
    const getBgmEndElm = () => {
        if (!!boxElementId.length && bgmAudio) {
            const closer = `</media><media end="${boxElementId}.end${bgmAudio.end}" fadeOutDur="${bgmAudio.fadeOut}" repeatCount="99" ><audio src="${bgmAudio.url}" /></media></par>`;
            boxElementId = '';
            bgmAudio = null;
            return closer;
        }
        return '';
    };
    const getBgmStartElmIfNoBgm = (elementName) => {
        if (!boxElementId.length && !bgmAudio) {
            return getBgmStartElm(elementName);
        }
        return '';
    };
    const getElementAudio = (elementName, isRandom) => {
        const audios = theme_1.getThemeElm(elementName, setting.themeName).audios;
        let i = ssmlIndex;
        if (isRandom) {
            i = Math.floor(Math.random() * (100 - audios.length)) + audios.length;
        }
        const audio = audios[i % audios.length];
        return audio;
    };
    // block =============================================
    ssmlRenderer.heading = (text, leval, raw, slugger) => {
        return `${getBgmStartElm('heading')}<p>${text}</p>${getBgmEndElm()}`;
    };
    ssmlRenderer.blockquote = (text) => {
        return `${getBgmStartElm('blockquote')}<p>${text}</p>${getBgmEndElm()}`;
    };
    // P
    ssmlRenderer.paragraph = (text) => {
        // BGM が設定されていなければ BGM を開始する
        // BGM が設定されていれば何も（閉じも）しない
        return `${getBgmStartElmIfNoBgm('paragraph')}<p><s>${text}</s></p>`;
    };
    ssmlRenderer.hr = () => {
        console.log(100, 'hr');
        const audio = getElementAudio('hr');
        const bgmCloser = getBgmEndElm();
        boxElementId = makeId(4, ssmlIndex);
        const ssml = `${bgmCloser}`
            + `<par>`
            + `<media xml:id="${boxElementId}" begin="${audio.begin}"><break time="0.25s"/></media>`
            + `<media end="${boxElementId}.end${audio.end}" fadeOutDur="${audio.fadeOut}"><audio src="${audio.url}" /></media>`
            + `</par>`;
        return ssml;
    };
    // inline =============================================
    // BR
    ssmlRenderer.br = function () {
        return '</s><s>';
    };
    // Strong
    ssmlRenderer.strong = function (text) {
        return `<break time="0.25s"/><emphasis level="strong"><prosody rate="slow">${text}</prosody></emphasis><break time="0.25s"/>`;
    };
    // EM
    ssmlRenderer.em = function (text) {
        return `<break time="0.25s"/><emphasis level="strong"><prosody rate="slow">${text}</prosody></emphasis><break time="0.25s"/>`;
    };
    return {
        parse: (markdown) => {
            idIndex = 0;
            boxElementId = '';
            let persed = marked_1.default(markdown, { renderer: ssmlRenderer }).replace(/<s><\/s>/g, '');
            persed = `<speak>${persed}${getBgmEndElm()}</speak>`;
            ssmlIndex++;
            boxElementId = '';
            return pretty_data_1.default.pd.xmlmin(persed, true);
        },
        buildHeader: (title, description, subTitle, subDescription) => {
            if (title || description) {
                boxElementId = makeId(4, ssmlIndex);
                const audio = getElementAudio('opening', true);
                const hasTitle = title && title.length !== 0;
                const hasDescription = description && description.length !== 0;
                const hasHeader = hasTitle || hasDescription;
                const hasSubTitle = subTitle && subTitle.length !== 0;
                const hasSubDescription = subDescription && subDescription.length !== 0;
                const hasSubHeader = hasSubTitle || hasSubDescription;
                let ssml = `<speak>`
                    + `<par>`
                    + `<media xml:id="${boxElementId}" begin="${audio.begin}">`;
                // Title & Description
                if (hasHeader) {
                    ssml += `<p>`;
                }
                if (hasTitle) {
                    ssml += `<s><emphasis level="strong"><prosody rate="slow">${title}</prosody></emphasis></s>`;
                }
                if (hasTitle && hasDescription) {
                    ssml += `<break time="2s"/>`;
                }
                if (hasDescription) {
                    ssml += `<s>${description}</s>`;
                }
                if (hasHeader) {
                    ssml += `</p>`;
                }
                if (hasHeader && hasSubHeader) {
                    ssml += `<break time="3s"/>`;
                }
                // Sub Title & Sub Description
                if (hasSubHeader) {
                    ssml += `<p>`;
                }
                if (hasSubTitle) {
                    ssml += `<s><emphasis level="strong"><prosody rate="slow">${subTitle}</prosody></emphasis></s>`;
                }
                if (hasSubTitle && hasSubDescription) {
                    ssml += `<break time="2s"/>`;
                }
                if (hasSubDescription) {
                    ssml += `<s>${subDescription}</s>`;
                }
                if (hasSubHeader) {
                    ssml += `</p>`;
                }
                ssml += `</media>`;
                ssml += `<media end="${boxElementId}.end${audio.end}" fadeOutDur="${audio.fadeOut}"><audio src="${audio.url}" /></media>`
                    + `</par>`
                    + `<break time="2s"/>`
                    + `</speak>`;
                return ssml;
            }
            return null;
        }
    };
};
