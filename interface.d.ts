import { iMarkdownToSsmlOptions } from './libs/markdownToSsml/markdownToSsml';
export interface iMdToMp3 extends iMarkdownToSsmlOptions {
    projectId: string;
    keyFileName: string;
    tempDir?: string;
}
