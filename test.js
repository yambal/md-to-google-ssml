"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
index_1.mdToMp3(`
はじめまして

# Header1

abcd

efgh

## Header2

あいうえお

> 忘れたいのに思い出せない

かきくけこ

---

さしすせそ

### Header3

**色**はにおへど  
ちりぬるを  
*ういのおくやま*  
けふこえて

`, {
    projectId: 'texttospeach-261314',
    keyFileName: 'TextToSpeach-e373fcafd2ef.json',
    debug: true,
    title: 'タイトル',
    description: '注釈',
    subTitle: 'サブ タイトル',
    subDescription: 'サブ 注釈'
}).then((audio) => {
    console.log('result', audio);
});
