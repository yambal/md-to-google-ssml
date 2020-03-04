import textToSpeech from '@google-cloud/text-to-speech'
import { TextToSpeechClient } from '@google-cloud/text-to-speech/build/src/v1'

const synthesis = (ssml: string, client:TextToSpeechClient) => {
  return new Promise((resolve: (audioContent: Buffer) => void) => {
    // console.log(3, ssml)
    // https://cloud.google.com/text-to-speech/docs/reference/rest/v1beta1/text/synthesize?hl=ja
    const request: any = {
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
    .then((responses: any) => {
      const audioContent = responses[0].audioContent
      resolve(audioContent)
    })
  })
}

export const googleTextToSpeech = (ssmlIn: string | string[], projectId: string, keyFileName: string) => {
  const client = new textToSpeech.TextToSpeechClient({
    projectId: projectId,
    keyFilename: keyFileName,
  });

  return new Promise((resolve: (audioContents: Buffer[]) => void) => {
    const ssmls: string[] = typeof ssmlIn === 'string' ? [ssmlIn] : ssmlIn
    const promisis = ssmls.map(
      ssml => {
        return synthesis(ssml, client)
      }
    )
    Promise.all(promisis)
      .then(
        (audioContents :Buffer[]) => {
          //console.log(audioContents)
          // https://www.npmjs.com/package/mp3-concat
          // http://www.cactussoft.co.jp/Sarbo/divMPeg3UnmanageHeader.html
          // https://github.com/Zazama/node-id3/blob/master/index.js
          resolve(audioContents)
        }
      )
  })
}