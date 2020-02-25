import { iMarkdownToSsmlOptions } from './markdownToSsml';
interface iMdToMp3 extends iMarkdownToSsmlOptions {
}
export declare const mdToMp3: (markdown: string, option: iMdToMp3) => void;
export {};
