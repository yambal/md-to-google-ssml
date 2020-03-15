import { iGetAboutResponse } from './ssmlMarked';
export interface iMarkdownToSsmlOptions {
    debug?: boolean;
    split?: boolean;
    title?: string;
    description?: string;
    subTitle?: string;
    subDescription?: string;
    conclusion?: string;
    closing?: string;
}
export declare const markdownToSsml: (markdown: string, options?: iMarkdownToSsmlOptions | undefined) => string[];
export declare const getHeadersAndLinks: (markdown: string) => iGetAboutResponse;
