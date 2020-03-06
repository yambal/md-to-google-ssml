export interface iMarkdownToSsmlOptions {
    debug?: boolean;
    split?: boolean;
    title?: string;
    description?: string;
}
export declare const markdownToSsml: (markdown: string, options?: iMarkdownToSsmlOptions | undefined) => string[];
