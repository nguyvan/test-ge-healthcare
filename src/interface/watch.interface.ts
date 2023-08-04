import { FORMAT, MODE, MODE_DISPLAY } from "../constant";
import { ButtonI } from "./button.interface";
import { TimeI } from "./time.interface";

export interface WatchI {
    timezone: string;
    time: TimeI;
    buttonIncrease: ButtonI;
    buttonMode: ButtonI;
    buttonLight: ButtonI;
    index: number;
    digits: Map<string, HTMLDivElement>;
    mode: MODE_DISPLAY;

    run: () => void;
    init: () => void;
    update: () => void;
    blinkHour: () => void;
    blinkMinute: () => void;
    unBlink: () => void;
}