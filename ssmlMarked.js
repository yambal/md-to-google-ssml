"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const marked_1 = __importDefault(require("marked"));
const pretty_data_1 = __importDefault(require("pretty-data"));
const theme_1 = require("./theme");
// ID =============================================
const makeId = (length, index) => {
    var S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let prefix = '';
    if (typeof index !== 'undefined' && index >= 0) {
        prefix = S.substr(index % S.length, 1);
    }
    const base = Array.from(Array(length)).map(() => S[Math.floor(Math.random() * S.length)]).join('') + prefix;
    return base.slice(-length);
};
exports.ssmlMarked = (options) => {
    const defaultOptions = {
        themeName: 'default'
    };
    const setting = Object.assign(defaultOptions, options);
    const ssmlRenderer = new marked_1.default.Renderer();
    let ssmlIndex;
    let boxElementId = '';
    let bgmAudio = null;
    // BGM =============================================
    // 
    const getBgmStartElm = (audio) => {
        const closer = getBgmEndElm();
        boxElementId = makeId(3, ssmlIndex);
        bgmAudio = audio;
        return `${closer}<par><media xml:id="${boxElementId}">`;
    };
    const getBgmEndElm = () => {
        if (!!boxElementId.length && bgmAudio) {
            const closer = `</media><media begin="${bgmAudio.begin}" end="${boxElementId}.eng${bgmAudio.end}"><audio url="${bgmAudio.url}" /></media></par>`;
            boxElementId = '';
            bgmAudio = null;
            return closer;
        }
        return '';
    };
    const getBgmStartElmIfNoBgm = (audio) => {
        if (!boxElementId.length && !bgmAudio) {
            return getBgmStartElm(audio);
        }
        return '';
    };
    // block =============================================
    ssmlRenderer.heading = (text, leval, raw, slugger) => {
        const audio = theme_1.getThemeElm('header', setting.themeName).audio;
        return `${getBgmStartElm(audio[0])}<p>${text}</p>${getBgmEndElm()}`; //${getBgmStartElm('section.mp3')}`
    };
    ssmlRenderer.blockquote = (text) => {
        const audio = theme_1.getThemeElm('blockquote', setting.themeName).audio;
        return `${getBgmStartElm(audio[0])}<p>${text}</p>${getBgmEndElm()}`;
    };
    // P
    ssmlRenderer.paragraph = (text) => {
        // BGM が設定されていなければ BGM を開始する
        // BGM が設定されていれば何も（閉じも）しない
        const audio = theme_1.getThemeElm('paragraph', setting.themeName).audio;
        return `${getBgmStartElmIfNoBgm(audio[0])}<p><s>${text}</s></p>`;
    };
    // inline =============================================
    // BR
    ssmlRenderer.br = function () {
        return '</s><s>';
    };
    // Strong
    ssmlRenderer.strong = function (text) {
        return `</s><s>${text}</s><s>`;
    };
    // EM
    ssmlRenderer.em = function (text) {
        return `</s><s>${text}</s><s>`;
    };
    return (markdown, index) => {
        ssmlIndex = typeof index !== 'undefined' ? index : -1;
        boxElementId = '';
        let persed = marked_1.default(markdown, { renderer: ssmlRenderer }).replace(/<s><\/s>/g, '');
        persed = `${persed}${getBgmEndElm()}`;
        ssmlIndex = -1;
        boxElementId = '';
        return pretty_data_1.default.pd.xmlmin(persed, true);
    };
};
