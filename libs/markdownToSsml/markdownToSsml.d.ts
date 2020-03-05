export interface iMarkdownToSsmlOptions {
    debug?: boolean;
    split?: boolean;
}
export declare const markdownToSsml: (markdown: string, options?: iMarkdownToSsmlOptions | undefined) => string[];
