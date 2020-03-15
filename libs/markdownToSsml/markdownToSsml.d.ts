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
