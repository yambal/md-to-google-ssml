export declare type tThemeName = 'default';
export interface iAudio {
    url: string;
    begin: string;
    end: string;
    fadeOut: string;
    loop: boolean;
}
interface iThemeElm {
    audios: iAudio[];
}
export declare const getThemeElm: (elem: string, themeName?: "default" | undefined) => iThemeElm;
export {};
