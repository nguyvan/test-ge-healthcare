export enum MODE {
    DISABLED = 0,
    EDIT_HOUR = 1,
    EDIT_MINUTE = 2
}

export enum FORMAT {
    GLOBAL = '24H',
    LOCAL = 'AM_PM'
}

export enum LOCAL_TYPE {
    AM = 'AM',
    PM = 'PM'
}

export enum MODE_DISPLAY {
    LIGHT = 'light',
    DARK = 'dark'
}

export const DIGIT_TO_NAME: string[] = 'zero one two three four five six seven eight nine'.split(' ');