"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const utility_1 = require("./utility");
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

`;
index_1.mdToMp3(testMarkdown, {
    projectId: 'texttospeach-261314',
    keyFileName: 'TextToSpeach-e373fcafd2ef.json',
    debug: true,
    title: 'タイトル',
    description: '注釈',
    subTitle: 'サブ タイトル',
    subDescription: 'サブ 注釈',
    conclusion: 'まとめ',
    closing: 'しめくくり'
}).then((audio) => {
    console.log('result', audio);
    console.log('about', index_1.getAbout(testMarkdown));
});
console.log('length', utility_1.getSsmLMaxLength(testMarkdown, {
    projectId: 'texttospeach-261314',
    keyFileName: 'TextToSpeach-e373fcafd2ef.json',
    debug: true,
    title: 'タイトル',
    description: '注釈',
    subTitle: 'サブ タイトル',
    subDescription: 'サブ 注釈',
    conclusion: 'まとめ',
    closing: 'しめくくり'
}));
