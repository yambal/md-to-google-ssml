import { markdownToSsml, iMarkdownToSsmlOptions } from './markdownToSsml'
import { googleTextToSpeech } from './googleTextToSpeech'
import * as ID3 from 'id3-parser'
import * as mm from 'music-metadata'
import * as fs from 'fs'
import * as util from 'util'
import { mkdirpThen } from './mkdirp-then'
import { v4 as uuidv4 } from 'uuid';

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const FfmpegCommand = require('fluent-ffmpeg');

interface iMdToMp3 extends iMarkdownToSsmlOptions {
  tempDir?: string
}

const tempDir = '/.test'

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

const cacheDelete = (path: string) => {
  return new Promise( (resolve: () => void, reject: (error: any) => void) => {
    try {
      fs.unlinkSync(path)
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

export const mdToMp3 = (markdown: string, option: iMdToMp3) => {
  const defaultOption:iMdToMp3 = {
    tempDir: '.test'
  }
  const setting:iMdToMp3 = Object.assign({}, defaultOption, option)

  const ssmls = markdownToSsml(markdown, option)
  const projectTempPath = `${process.cwd()}/${setting.tempDir}`
  googleTextToSpeech(ssmls, 'texttospeach-261314', 'TextToSpeach-e373fcafd2ef.json')
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
                const buf = fs.readFileSync(tempComcatPath)
                paths.push(tempComcatPath)
                setting.debug && console.log(buf)
                Promise.all(
                  paths.map(
                    (path) => {
                      cacheDelete(path)
                    }
                  )
                ).then(
                  () => {
                    console.log(79)
                  }
                )
              })
            command.save(tempComcatPath)
          }
        )
      }
    )
}