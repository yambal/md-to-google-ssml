/// <reference types="node" />
import { iMarkdownToSsmlOptions } from './libs/markdownToSsml/markdownToSsml';
interface iMdToMp3 extends iMarkdownToSsmlOptions {
    projectId: string;
    keyFileName: string;
    tempDir?: string;
}
export declare const mdToMp3: (markdown: string, option: iMdToMp3) => Promise<Buffer>;
export {};
