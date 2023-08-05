import { DIGIT_TO_NAME, FORMAT, MODE_DISPLAY } from "../../constant";
import { ButtonI } from "../../interface/button.interface";
import { TimeI } from "../../interface/time.interface";
import { WatchI } from "../../interface/watch.interface";
import { Animation } from "../../lib/animation";
import { Point } from "../../lib/animation/src/class/point.class";
import { PointI } from "../../lib/animation/src/interface/point.interface";
import { ButtonDisplay } from "../button/buttonDisplay.class";
import { ButtonIncrease } from "../button/buttonIncrease.class";
import { ButtonLight } from "../button/buttonLight.class";
import { ButtonMode } from "../button/buttonMode.class";
import { ButtonReset } from "../button/buttonReset.class";
import { Time } from "../time/time.class";


export class Watch implements WatchI {

    public buttonIncrease: ButtonI;
    public buttonLight: ButtonI;
    public buttonMode: ButtonI;
    public buttonDisplay: ButtonI;
    public buttonReset: ButtonI;
    public index: number;
    public time: TimeI;
    public timezone: string;
    public mode: MODE_DISPLAY;

    public digits: Map<string, HTMLDivElement | HTMLButtonElement>;
    public point: PointI;


    constructor(timezone: string, index: number) {
        this.buttonIncrease = new ButtonIncrease();
        this.buttonLight = new ButtonLight();
        this.buttonMode = new ButtonMode();
        this.buttonDisplay = new ButtonDisplay();
        this.buttonReset = new ButtonReset();
        this.index = index;
        this.timezone = timezone;
        this.time = new Time(timezone);
        this.mode = MODE_DISPLAY.LIGHT;
        this.digits = new Map<string, HTMLDivElement>();
        this.init();
    }

    run() {
        this.time.start(() => {
            this.rotate(this.point.x + 50, this.point.y + 50, 10)
            this.update()
        });
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
        ampmElement.innerHTML = this.time.format === FORMAT.GLOBAL? '': this.time.localType;

        const timezoneElement = document.createElement('span');
        timezoneElement.innerHTML = this.timezone;

        this.digits.set('ampm', ampmElement);

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
        watchElement.append(timezoneElement);

        const buttonContainerElement = document.createElement('div');
        buttonContainerElement.className = 'button-container';

        const increaseButton = document.createElement('button');
        increaseButton.innerHTML = 'increase';
        increaseButton.addEventListener('click', this.buttonIncrease.onPress.bind(this.buttonIncrease, this.time, this));

        const modeButton = document.createElement('button');
        modeButton.innerHTML = 'mode';
        modeButton.addEventListener('click', this.buttonMode.onPress.bind(this.buttonMode, this.time, this));

        const lightButton = document.createElement('button');
        lightButton.innerHTML = this.mode === MODE_DISPLAY.LIGHT? MODE_DISPLAY.DARK: MODE_DISPLAY.LIGHT;
        lightButton.addEventListener('click', this.buttonLight.onPress.bind(this.buttonLight, this.time, this));

        const displayButton = document.createElement('button');
        displayButton.innerHTML = this.time.format;
        displayButton.addEventListener('click', this.buttonDisplay.onPress.bind(this.buttonDisplay, this.time, this));

        const resetButton = document.createElement('button');
        resetButton.innerHTML = 'reset';
        resetButton.addEventListener('click', this.buttonReset.onPress.bind(this.buttonReset, this.time, this));

        this.digits.set('lightButton', lightButton);
        this.digits.set('displayButton', displayButton);

        buttonContainerElement.append(increaseButton);
        buttonContainerElement.append(modeButton);
        buttonContainerElement.append(lightButton);
        buttonContainerElement.append(displayButton);
        buttonContainerElement.append(resetButton);

        watchElement.append(buttonContainerElement)

        parent.appendChild(watchElement);

        this.getCoordinate()
    }

    update() {
        const hour: string = this.time.hour < 10? `0${this.time.hour}`: this.time.hour.toString();
        const minute: string = this.time.minute < 10? `0${this.time.minute}`: this.time.minute.toString();
        const second: string = this.time.second < 10? `0${this.time.second}`: this.time.second.toString();

        this.digits.get('ampm').innerHTML = this.time.format === FORMAT.GLOBAL? '': this.time.localType;
        this.digits.get('h1').classList.remove(...DIGIT_TO_NAME);
        this.digits.get('h2').classList.remove(...DIGIT_TO_NAME);
        this.digits.get('m1').classList.remove(...DIGIT_TO_NAME);
        this.digits.get('m2').classList.remove(...DIGIT_TO_NAME);
        this.digits.get('s1').classList.remove(...DIGIT_TO_NAME);
        this.digits.get('s2').classList.remove(...DIGIT_TO_NAME);

        this.digits.get('h1').classList.add(DIGIT_TO_NAME[parseInt(hour[0])]);
        this.digits.get('h2').classList.add(DIGIT_TO_NAME[parseInt(hour[1])]);
        this.digits.get('m1').classList.add(DIGIT_TO_NAME[parseInt(minute[0])]);
        this.digits.get('m2').classList.add(DIGIT_TO_NAME[parseInt(minute[1])]);
        this.digits.get('s1').classList.add(DIGIT_TO_NAME[parseInt(second[0])]);
        this.digits.get('s2').classList.add(DIGIT_TO_NAME[parseInt(second[1])]);

        const element = document.getElementById(`watch-${this.index}`)
        const width: number = element.offsetWidth;
        const height: number = element.offsetHeight;

    }

    blinkHour() {
        this.digits.get('h1').classList.add('blink');
        this.digits.get('h2').classList.add('blink');
        this.digits.get('m1').classList.remove('blink');
        this.digits.get('m2').classList.remove('blink');
    };

    blinkMinute() {
        this.digits.get('m1').classList.add('blink');
        this.digits.get('m2').classList.add('blink');
        this.digits.get('h1').classList.remove('blink');
        this.digits.get('h2').classList.remove('blink');
    };

    unBlink() {
        this.digits.get('m1').classList.remove('blink');
        this.digits.get('m2').classList.remove('blink');
        this.digits.get('h1').classList.remove('blink');
        this.digits.get('h2').classList.remove('blink');
    };

    reset() {
        this.mode = MODE_DISPLAY.LIGHT;
        const element = document.getElementById(`watch-${this.index}`);
        element.className = `watch light`;
        this.digits.get('displayButton').innerHTML = this.time.format;
    }

    getCoordinate(): PointI {
        const element = document.getElementById(`watch-${this.index}`)
        const offsetLeft: number = element.offsetLeft;
        const offsetTop: number = element.offsetTop;
        const width: number = element.offsetWidth;
        const height: number = element.offsetHeight;
        const x = offsetLeft + width / 2;
        const y = offsetTop + height / 2;
        this.point = new Point(x, y)
        return this.point
    }

    rotate(x: number, y: number, rad: number) {
        const centerPoint = new Point(x, y);
        const vectorPoint = this.point.subtract(centerPoint);
        const animation = new Animation()
        const newPositionMatrix = animation.rotate(vectorPoint, rad);

        const newPositionVector = newPositionMatrix.coord.map((value: number[]) => value[0]);
        
        const newX = newPositionVector[0] + x;
        const newY = newPositionVector[1] + y;

        this.point = new Point(newX, newY);
        
    }
}