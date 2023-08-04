import { DIGIT_TO_NAME, MODE_DISPLAY } from "../../constant";
import { ButtonI } from "../../interface/button.interface";
import { TimeI } from "../../interface/time.interface";
import { WatchI } from "../../interface/watch.interface";
import { ButtonIncrease } from "../button/buttonIncrease.class";
import { ButtonLight } from "../button/buttonLight.class";
import { ButtonMode } from "../button/buttonMode.class";
import { Time } from "../time/time.class";


export class Watch implements WatchI {

    public buttonIncrease: ButtonI;
    public buttonLight: ButtonI;
    public buttonMode: ButtonI;
    public index: number;
    public time: TimeI;
    public timezone: string;
    public mode: MODE_DISPLAY;

    public digits: Map<string, HTMLDivElement>;

    constructor(timezone: string, index: number) {
        this.buttonIncrease = new ButtonIncrease();
        this.buttonLight = new ButtonLight();
        this.buttonMode = new ButtonMode();
        this.index = index;
        this.timezone = timezone;
        this.time = new Time(timezone);
        this.mode = MODE_DISPLAY.LIGHT;
        this.digits = new Map<string, HTMLDivElement>();
        this.init();
    }

    run() {
        this.time.start(() => {
            this.update()
            console.log(this.time)
        })
    }

    init() {
        const parent = document.getElementById('list-watches');

        const watchElement = document.createElement('div');
        watchElement.id = `watch-${this.index}`
        watchElement.className = `watch ${this.mode}`;

        const displayElement = document.createElement('div');
        displayElement.className = 'display';

        const ampmElement = document.createElement('div');
        ampmElement.className = 'ampm';

        const digitElement = document.createElement('div');
        digitElement.className = 'digits';

        const positions: string[] = [
            'h1', 'h2', ':', 'm1', 'm2', ':', 's1', 's2'
        ];

        for (let str of positions) {
            if (str === ':') {
                const dotElement = document.createElement('div');
                dotElement.className = 'dots';
                digitElement.append(dotElement)
            }
            else {
                const posElement = document.createElement('div');
                for(let i: number = 1; i < 8; i++) {
                    const spanElement = document.createElement('span');
                    spanElement.className = `d${i}`
                    posElement.append(spanElement);
                }
                this.digits.set(str, posElement)
                digitElement.append(posElement);
            }
        }

        const hour: string = this.time.hour < 10? `0${this.time.hour}`: this.time.hour.toString();
        const minute: string = this.time.minute < 10? `0${this.time.minute}`: this.time.minute.toString();
        const second: string = this.time.second < 10? `0${this.time.second}`: this.time.second.toString();

        this.digits.get('h1').setAttribute('class', DIGIT_TO_NAME[parseInt(hour[0])]);
        this.digits.get('h2').setAttribute('class', DIGIT_TO_NAME[parseInt(hour[1])]);
        this.digits.get('m1').setAttribute('class', DIGIT_TO_NAME[parseInt(minute[0])]);
        this.digits.get('m2').setAttribute('class', DIGIT_TO_NAME[parseInt(minute[1])]);
        this.digits.get('s1').setAttribute('class', DIGIT_TO_NAME[parseInt(second[0])]);
        this.digits.get('s2').setAttribute('class', DIGIT_TO_NAME[parseInt(second[1])]);

        displayElement.append(ampmElement);
        displayElement.append(digitElement);

        watchElement.append(displayElement);

        parent.appendChild(watchElement);

    }

    update() {
        const hour: string = this.time.hour < 10? `0${this.time.hour}`: this.time.hour.toString();
        const minute: string = this.time.minute < 10? `0${this.time.minute}`: this.time.minute.toString();
        const second: string = this.time.second < 10? `0${this.time.second}`: this.time.second.toString();

        this.digits.get('h1').setAttribute('class', DIGIT_TO_NAME[parseInt(hour[0])]);
        this.digits.get('h2').setAttribute('class', DIGIT_TO_NAME[parseInt(hour[1])]);
        this.digits.get('m1').setAttribute('class', DIGIT_TO_NAME[parseInt(minute[0])]);
        this.digits.get('m2').setAttribute('class', DIGIT_TO_NAME[parseInt(minute[1])]);
        this.digits.get('s1').setAttribute('class', DIGIT_TO_NAME[parseInt(second[0])]);
        this.digits.get('s2').setAttribute('class', DIGIT_TO_NAME[parseInt(second[1])]);
    }

    blinkHour() {

    };
    
    blinkMinute() {

    };
    unBlink() {

    };

}