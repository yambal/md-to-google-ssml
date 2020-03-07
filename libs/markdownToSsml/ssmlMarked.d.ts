import { tThemeName } from '../theme';
/**
 *
 */
interface iSsmlMarked {
    themeName?: tThemeName;
}
interface iSsmlMarkedMethod {
    parse: (matkdown: string) => string;
    buildHeader: (title?: string, description?: string, subTitle?: string, subDescription?: string) => string | null;
}
export declare const ssmlMarked: (options?: iSsmlMarked | undefined) => iSsmlMarkedMethod;
export {};
