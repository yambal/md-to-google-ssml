export interface iMarkdownToSsmlOptions {
    debug?: boolean;
    split?: boolean;
    title?: string;
    description?: string;
    subTitle?: string;
    subDescription?: string;
}
export declare const markdownToSsml: (markdown: string, options?: iMarkdownToSsmlOptions | undefined) => string[];
