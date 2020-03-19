/// <reference types="node" />
import { iGetAboutResponse } from './libs/markdownToSsml/ssmlMarked';
import { iMdToMp3 } from './interface';
export declare const mdToMp3: (markdown: string, option: iMdToMp3) => Promise<Buffer>;
export declare const getAbout: (ssml: string) => iGetAboutResponse;
