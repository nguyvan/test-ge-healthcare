import { FORMAT, MODE } from "../constant";

export interface WatchI {

    seconds: number,
    minute: number,
    hours: number,

    mode: MODE,
    format: FORMAT,

    
    setMode: (mode: MODE) => void,
    formatTime: () => void;
}