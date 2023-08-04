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

    increaseHour: () => void,
    increaseMinute: () => void,
    changeFormat: (format: FORMAT) => void,

    reset: () => void,
    display: () => string,

    start: () => void,
    transformHourLocalToGlobal: () => number,
    setDate: (date: Date) => void
} 