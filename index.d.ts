/// <reference types="node" />
import { iMarkdownToSsmlOptions } from './libs/markdownToSsml/markdownToSsml';
import { iGetAboutResponse } from './libs/markdownToSsml/ssmlMarked';
interface iMdToMp3 extends iMarkdownToSsmlOptions {
    projectId: string;
    keyFileName: string;
    tempDir?: string;
}
export declare const mdToMp3: (markdown: string, option: iMdToMp3) => Promise<Buffer>;
export declare const getAbout: (ssml: string) => iGetAboutResponse;
export {};
