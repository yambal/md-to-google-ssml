"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const marked_1 = __importDefault(require("marked"));
const ssmlMarked_1 = require("./ssmlMarked");
exports.markdownToSsml = (markdown, options) => {
    const defaultOptions = {
        debug: false,
        split: true
    };
    const setting = Object.assign(defaultOptions, options);
    const parser = ssmlMarked_1.ssmlMarked();
    // Markdown を分割する
    let splitMarkdowns = [markdown];
    if (setting.split) {
        const temporary = markdown.replace(/^#/mg, '{{split}}#');
        splitMarkdowns = temporary.split(`{{split}}`).filter(splitMarkdown => {
            return splitMarkdown.replace(/[\r\n\s　]/, '').length !== 0;
        });
    }
    setting.debug && console.log(splitMarkdowns);
    const splitSsml = splitMarkdowns.map((markdown, index) => {
        return parser(markdown, index);
    });
    setting.debug && console.log(splitSsml);
    const ssmlRenderer = new marked_1.default.Renderer();
    // const parsed = marked(markdown, { renderer: renderer })
};
