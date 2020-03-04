"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const text_to_speech_1 = __importDefault(require("@google-cloud/text-to-speech"));
const synthesis = (ssml, client) => {
    return new Promise((resolve) => {
        // console.log(3, ssml)
        // https://cloud.google.com/text-to-speech/docs/reference/rest/v1beta1/text/synthesize?hl=ja
        const request = {
            input: {
                ssml
            },
            voice: {
                languageCode: 'ja-JP',
                name: 'ja-JP-Standard-A',
                ssmlGender: 'NEUTRAL'
            },
            audioConfig: {
                speakingRate: 1.15,
                pitch: -5,
                audioEncoding: 'MP3'
            },
        };
        client.synthesizeSpeech(request)
            .then((responses) => {
            const audioContent = responses[0].audioContent;
            resolve(audioContent);
        });
    });
};
exports.googleTextToSpeech = (ssmlIn, projectId, keyFileName) => {
    const client = new text_to_speech_1.default.TextToSpeechClient({
        projectId: projectId,
        keyFilename: keyFileName,
    });
    return new Promise((resolve) => {
        const ssmls = typeof ssmlIn === 'string' ? [ssmlIn] : ssmlIn;
        const promisis = ssmls.map(ssml => {
            return synthesis(ssml, client);
        });
        Promise.all(promisis)
            .then((audioContents) => {
            //console.log(audioContents)
            // https://www.npmjs.com/package/mp3-concat
            // http://www.cactussoft.co.jp/Sarbo/divMPeg3UnmanageHeader.html
            // https://github.com/Zazama/node-id3/blob/master/index.js
            resolve(audioContents);
        });
    });
};
