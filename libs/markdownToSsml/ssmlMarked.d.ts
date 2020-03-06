import { tThemeName } from '../theme';
/**
 *
 */
interface iSsmlMarked {
    themeName?: tThemeName;
}
interface iSsmlMarkedMethod {
    parse: (matkdown: string) => string;
    buildHeader: (title?: string, description?: string) => string | null;
}
export declare const ssmlMarked: (options?: iSsmlMarked | undefined) => iSsmlMarkedMethod;
export {};
