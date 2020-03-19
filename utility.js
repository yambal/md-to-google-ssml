"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const markdownToSsml_1 = require("./libs/markdownToSsml/markdownToSsml");
exports.getSsmLMaxLength = (markdown, option) => {
    let max = 0;
    const ssmls = markdownToSsml_1.markdownToSsml(markdown, option);
    ssmls.forEach(ssml => {
        if (max <= ssml.length) {
            max = ssml.length;
        }
    });
    return max;
};
