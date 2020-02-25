import { mdToMp3 } from './index'

mdToMp3(`
はじめまして

# Header1

abcd

efgh

## Header2

あいうえお

> 忘れたいのに思い出せない

かきくけこ

### Header3

**色**はにおへど  
ちりぬるを  
*ういのおくやま*  
けふこえて

`, {
  debug: true  
})