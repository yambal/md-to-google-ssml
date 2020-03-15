import { markdownToSsml, iMarkdownToSsmlOptions, getHeadersAndLinks} from './libs/markdownToSsml/markdownToSsml'
import { iGetAboutResponse } from './libs/markdownToSsml/ssmlMarked'
import { googleTextToSpeech } from './libs/googleTextToSpeech'
import * as ID3 from 'id3-parser'
import * as mm from 'music-metadata'
import * as fs from 'fs'
import * as util from 'util'
import { mkdirpThen } from './libs/mkdirp-then'
import { v4 as uuidv4 } from 'uuid';

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const FfmpegCommand = require('fluent-ffmpeg');

interface iMdToMp3 extends iMarkdownToSsmlOptions {
  projectId: string
  keyFileName: string
  tempDir?: string
}

const cacheSave = (audio:Buffer, dir:string) => {
  return new Promise( (resolve: (path: string) => void, reject: (err: any) => void) => {
    mkdirpThen(dir)
      .then(
        () => {
          const path = `${dir}/${uuidv4()}.mp3`
          fs.writeFile(path, audio, 'binary', (error) => {
            if (error) {
              reject(error)
              return
            }
            resolve(path)
          })
        }
      )
  })
}

const cacheDelete = (path: string, debug?: boolean) => {
  return new Promise( (resolve: () => void, reject: (error: any) => void) => {
    try {
      fs.unlinkSync(path)
      debug && console.log(`delete cache file ${path}`)
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

export const mdToMp3 = (markdown: string, option: iMdToMp3) => {
  const defaultOption:iMdToMp3 = {
    projectId: '',
    keyFileName: '',
    tempDir: '.mdToMp3Temp'
  }
  const setting:iMdToMp3 = Object.assign({}, defaultOption, option)

  const ssmls = markdownToSsml(markdown, option)
  const projectTempPath = `${process.cwd()}/${setting.tempDir}`

  return new Promise( (resolve: (audio: Buffer) => void, reject: (error: any) => void) => {
    googleTextToSpeech(ssmls, setting.projectId, setting.keyFileName)
      .then(
        (audioContents: Buffer[]) => {
          Promise.all(
            audioContents.map(
              (audioContent) => {
                return cacheSave(audioContent, projectTempPath)
              }
            )
          ).then(
            (paths) => {
              const tempComcatPath = `${projectTempPath}/${uuidv4()}.mp3`
              var filter = 'concat:' + paths.join('|')
              const command = new FfmpegCommand()
              command
                .setFfmpegPath(ffmpegPath)
                .input(filter)
                .outputOptions('-acodec copy')
                .on('end', () => {
                  setting.debug && console.log('concated audios')
                  const buf = fs.readFileSync(tempComcatPath)
                  paths.push(tempComcatPath)
                  Promise.all(
                    paths.map(
                      (path) => {
                        cacheDelete(path, setting.debug)
                      }
                    )
                  ).then(
                    () => {
                      setting.debug && console.log('resolve')
                      resolve(buf)
                    }
                  )
                })
              command.save(tempComcatPath)
            }
          )
        }
      )
  })
}

interface iAbout extends iGetAboutResponse{}

export const getAbout = (ssml: string): iGetAboutResponse => {
  return getHeadersAndLinks(ssml)
}