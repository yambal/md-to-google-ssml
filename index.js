"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const markdownToSsml_1 = require("./markdownToSsml");
exports.mdToMp3 = (markdown, option) => {
    const ssml = markdownToSsml_1.markdownToSsml(markdown, option);
};
