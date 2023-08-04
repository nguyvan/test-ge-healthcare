import { WatchI } from "./watch.interface";


export interface WatchManagerI {

    watches: WatchI[];
    nbWatch: number;
    listTimeZone: string[];
    selectedTimeZone: string;


    addWatch: () => void;
    init: () => void;
    select: () => void;
}