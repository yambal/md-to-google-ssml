import { mdToMp3, getAbout } from './index'
import { getSsmLMaxLength } from './utility'

const testMarkdown = `
はじめまして

# Header1

abcd

efgh

## Header2

あいうえお

> 忘れたいのに思い出せない

かきくけこ
[リンク](https://www.yambal.net "タイトル")

---

さしすせそ

### Header3

**色**はにおへど  
ちりぬるを  
*ういのおくやま*  
けふこえて

- リスト1
- リスト2
- リスト3

# レベルスプリットテスト

魑魅魍魎

#### これはスプリットされない

このレベル以下は、ＢＧＭを変えたくない

`

mdToMp3(testMarkdown, {
  projectId: 'texttospeach-261314',
  keyFileName: 'TextToSpeach-e373fcafd2ef.json',
  debug:true,
  title: 'タイトル',
  description: '注釈',
  subTitle: 'サブ タイトル',
  subDescription: 'サブ 注釈',
  conclusion: 'まとめ',
  closing: 'しめくくり'
}).then(
  (audio) => {
    console.log('result', audio)
    console.log('about', getAbout(testMarkdown))
  }
)

console.log('length', getSsmLMaxLength(testMarkdown, {
  projectId: 'texttospeach-261314',
  keyFileName: 'TextToSpeach-e373fcafd2ef.json',
  debug:true,
  title: 'タイトル',
  description: '注釈',
  subTitle: 'サブ タイトル',
  subDescription: 'サブ 注釈',
  conclusion: 'まとめ',
  closing: 'しめくくり'
}))