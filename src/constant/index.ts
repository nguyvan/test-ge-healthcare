/**
 * Mode of the watch
 */
export enum MODE {
    DISABLED = 0, // normal mode
    EDIT_HOUR = 1, // edit mode (hour)
    EDIT_MINUTE = 2 // edit mode (minute)
}

/**
 * Time format
 */
export enum FORMAT {
    GLOBAL = '24H', // time displayed in format 24h
    LOCAL = 'A/P'   // time displayed in format AM/PM
}

/**
 * Type of local time format
 */
export enum LOCAL_TYPE {
    AM = 'AM', // morning time
    PM = 'PM' // afternoon time
}

/**
 * Display mode of the watch
 */
export enum MODE_DISPLAY {
    LIGHT = 'light', // light mode
    DARK = 'dark' // dark mode
}

export const DIGIT_TO_NAME: string[] = 'zero one two three four five six seven eight nine'.split(' ');