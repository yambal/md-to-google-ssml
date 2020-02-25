export declare type tThemeName = 'default';
export interface iAudio {
    url: string;
    begin: string;
    end: string;
}
interface iThemeElm {
    audio: iAudio[];
}
export declare const getThemeElm: (elem: string, themeName?: "default" | undefined) => iThemeElm;
export {};
