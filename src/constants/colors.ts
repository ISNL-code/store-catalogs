import mainTheme from 'theme/mainTheme';

export enum Colors {
    GRAY = '#949494',
    GRAY_100 = 'rgb(250, 250, 250)',
    GRAY_300 = 'rgb(240, 240, 240)',
    GRAY_300_75 = 'rgb(240, 240, 240, 0.75)',
    GRAY_500 = 'rgb(200, 200, 200)',
    GRAY_900 = '#505050',
    RED_300 = '#f88d8d',
    RED = '#da0e0e',
    WHITE = '#fff',
    WHITE_10 = '#ffffff21',
    BLACK = '#000',
    ORANGE = '#f38620',
    LIGHT_BLUE = '#4990ec',

    // shadows
    SHADOW = `0 0 5px 3px #afafaf66`,

    //typography
    TEXT_GRAY = 'gray',
}

interface ColorInterface {
    PRIMARY: string;
    PRIMARY_LIGHT: string;
    PRIMARY_DARK: string;
    SECONDARY: string;
    SECONDARY_LIGHT: string;
    SECONDARY_DARK: string;
    SUCCESS: string;
    ERROR: string;
}

export const Color: ColorInterface = {
    PRIMARY: mainTheme?.palette?.primary?.main,
    PRIMARY_LIGHT: mainTheme?.palette?.primary?.light,
    PRIMARY_DARK: mainTheme?.palette?.primary?.dark,
    SECONDARY: mainTheme?.palette?.secondary?.main,
    SECONDARY_DARK: mainTheme?.palette?.secondary?.dark,
    SECONDARY_LIGHT: mainTheme?.palette?.secondary?.light,
    SUCCESS: mainTheme?.palette?.success?.main,
    ERROR: mainTheme?.palette?.error?.main,
};
