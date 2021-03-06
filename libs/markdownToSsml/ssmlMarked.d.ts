import { tThemeName } from '../theme';
/**
 *
 */
interface iSsmlMarked {
    themeName?: tThemeName;
    paragraphBreak?: string;
    brBreak?: string;
}
interface iSsmlMarkedMethod {
    parse: (matkdown: string) => string;
    buildHeader: (title?: string, description?: string, subTitle?: string, subDescription?: string) => string | null;
    buildFooter: (Conclusion?: string, closing?: string) => string | null;
}
export declare const ssmlMarked: (options?: iSsmlMarked | undefined) => iSsmlMarkedMethod;
export interface iGetAboutResponse {
    headers: {
        text: string;
        level: number;
    }[];
    links: {
        text: string;
        href: string;
    }[];
}
export declare const getAbout: (markdown: string) => iGetAboutResponse;
export {};
