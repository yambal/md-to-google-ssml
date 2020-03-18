"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const markdownToSsml_1 = require("./libs/markdownToSsml/markdownToSsml");
const googleTextToSpeech_1 = require("./libs/googleTextToSpeech");
const fs = __importStar(require("fs"));
const mkdirp_then_1 = require("./libs/mkdirp-then");
const uuid_1 = require("uuid");
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const FfmpegCommand = require('fluent-ffmpeg');
const cacheSave = (audio, dir) => {
    return new Promise((resolve, reject) => {
        mkdirp_then_1.mkdirpThen(dir)
            .then(() => {
            const path = `${dir}/${uuid_1.v4()}.mp3`;
            fs.writeFile(path, audio, 'binary', (error) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(path);
            });
        });
    });
};
const cacheDelete = (path, debug) => {
    return new Promise((resolve, reject) => {
        try {
            fs.unlinkSync(path);
            debug && console.log(`delete cache file ${path}`);
            resolve();
        }
        catch (error) {
            reject(error);
        }
    });
};
exports.mdToMp3 = (markdown, option) => {
    const defaultOption = {
        projectId: '',
        keyFileName: '',
        tempDir: '.mdToMp3Temp'
    };
    const setting = Object.assign({}, defaultOption, option);
    const ssmls = markdownToSsml_1.markdownToSsml(markdown, option);
    const projectTempPath = `${process.cwd()}/${setting.tempDir}`;
    return new Promise((resolve, reject) => {
        googleTextToSpeech_1.googleTextToSpeech(ssmls, setting.projectId, setting.keyFileName)
            .then((audioContents) => {
            Promise.all(audioContents.map((audioContent) => {
                return cacheSave(audioContent, projectTempPath);
            })).then((paths) => {
                const tempComcatPath = `${projectTempPath}/${uuid_1.v4()}.mp3`;
                var filter = 'concat:' + paths.join('|');
                const command = new FfmpegCommand();
                command
                    .setFfmpegPath(ffmpegPath)
                    .input(filter)
                    .outputOptions('-acodec copy')
                    .on('end', () => {
                    setting.debug && console.log('concated audios');
                    const buf = fs.readFileSync(tempComcatPath);
                    paths.push(tempComcatPath);
                    Promise.all(paths.map((path) => {
                        cacheDelete(path, setting.debug);
                    })).then(() => {
                        setting.debug && console.log('resolve');
                        resolve(buf);
                    });
                });
                command.save(tempComcatPath);
            });
        });
    });
};
exports.getAbout = (ssml) => {
    return markdownToSsml_1.getHeadersAndLinks(ssml);
};
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
