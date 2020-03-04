import { tThemeName } from './theme';
/**
 *
 */
interface iSsmlMarked {
    themeName?: tThemeName;
}
export declare const ssmlMarked: (options?: iSsmlMarked | undefined) => (matkdown: string) => string;
export {};
