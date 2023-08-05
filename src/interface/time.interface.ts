import { FORMAT, LOCAL_TYPE, MODE } from "../constant"

export interface TimeI {
    hour: number,
    minute: number, 
    second: number,
    mode: MODE,
    format: FORMAT,
    localType: LOCAL_TYPE,
    timeZone: string,
    timer: NodeJS.Timer;
    isPassedTimezone: boolean;
    increaseHour: () => void,
    increaseMinute: () => void,
    changeFormat: () => void,

    reset: () => void,
    display: () => string,

    start: (callback: () => void) => void,
    transformHourLocalToGlobal: () => number,
    setDate: (date: Date) => void
} 