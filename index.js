"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const markdownToSsml_1 = require("./markdownToSsml");
const googleTextToSpeech_1 = require("./googleTextToSpeech");
const fs = __importStar(require("fs"));
const mkdirp_then_1 = require("./mkdirp-then");
const uuid_1 = require("uuid");
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const FfmpegCommand = require('fluent-ffmpeg');
const tempDir = '/.test';
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
const cacheDelete = (path) => {
    return new Promise((resolve, reject) => {
        try {
            fs.unlinkSync(path);
            resolve();
        }
        catch (error) {
            reject(error);
        }
    });
};
exports.mdToMp3 = (markdown, option) => {
    const defaultOption = {
        tempDir: '.test'
    };
    const setting = Object.assign({}, defaultOption, option);
    const ssmls = markdownToSsml_1.markdownToSsml(markdown, option);
    const projectTempPath = `${process.cwd()}/${setting.tempDir}`;
    googleTextToSpeech_1.googleTextToSpeech(ssmls, 'texttospeach-261314', 'TextToSpeach-e373fcafd2ef.json')
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
                const buf = fs.readFileSync(tempComcatPath);
                paths.push(tempComcatPath);
                setting.debug && console.log(buf);
                Promise.all(paths.map((path) => {
                    cacheDelete(path);
                })).then(() => {
                    console.log(79);
                });
            });
            command.save(tempComcatPath);
        });
    });
};
