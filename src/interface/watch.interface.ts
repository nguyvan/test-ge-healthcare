import { MODE_DISPLAY } from "../constant";
import { PointI } from "../lib/animation/src/interface/point.interface";
import { ButtonI } from "./button.interface";
import { TimeI } from "./time.interface";

export interface WatchI {
    timezone: string;
    time: TimeI;
    buttonIncrease: ButtonI;
    buttonMode: ButtonI;
    buttonLight: ButtonI;
    buttonDisplay: ButtonI;
    buttonReset: ButtonI;
    index: number;
    digits: Map<string, HTMLDivElement | HTMLButtonElement>;
    mode: MODE_DISPLAY;
    point?: PointI;

    timerAnimationRotate: NodeJS.Timer;
    timerAnimationRotateAroundSelf: NodeJS.Timer;

    initDeg: number;
    initScale: PointI;

    run: () => void;
    init: () => void;
    update: () => void;
    blinkHour: () => void;
    blinkMinute: () => void;
    unBlink: () => void;
    reset: () => void;
    getCoordinate: () => PointI;

    initAnimation: () => void;
    rotate: (x: number, y: number, rad: number) => void;
    rotateAroundSelf: (rad: number) => void;
    resetAnimation: () => void;

    startRotateAroundSelf: () => void;
}