import { FORMAT, LOCAL_TYPE, MODE } from "../../constant";
import { TimeI } from "../../interface/time.interface";


export class Time implements TimeI {
    public hour: number;
    public minute: number;
    public second: number;

    public mode: MODE;
    public format: FORMAT;
    public localType: LOCAL_TYPE;

    public timeZone: string;
    public timer: NodeJS.Timer;

    public isPassedTimezone: boolean;

    constructor(timeZone: string) { 
        this.timeZone = timeZone;
        this.mode = MODE.DISABLED,
        this.format = FORMAT.GLOBAL;
        this.isPassedTimezone = false;
        this.reset();
        this.localType = this.format === FORMAT.GLOBAL? (this.hour >= 12? LOCAL_TYPE.PM: LOCAL_TYPE.AM): LOCAL_TYPE.PM 
    }

    increaseHour() {
        if (this.format === FORMAT.GLOBAL) {
            this.hour++;
            if (this.hour >= 24) {
                this.hour = 0;
            }
        }
        else {
            this.hour++;
            if (this.localType === LOCAL_TYPE.AM) {
                if (this.hour >= 12) {
                    this.localType = LOCAL_TYPE.PM;
                    this.hour -= this.hour === 12? 0: 12
                }
            }
            else {
                if (this.hour >= 12) {
                    this.localType = LOCAL_TYPE.AM;
                    this.hour -= this.hour === 12? 0: 12
                }
            }
        }
    }

    increaseMinute() {
        this.minute++;
        if (this.minute >= 60) {
            this.minute = 0;
        }
    }

    changeFormat() {
        switch (this.format) {
            case FORMAT.GLOBAL:
                let now = new Date();
                now.setHours(this.hour, this.minute, this.second);
                const nowStr: string = now.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
                const [hour, minute, second]: number[] = nowStr.split(':').map((value) => parseInt(value));
                this.localType = nowStr.split(' ')[1] as LOCAL_TYPE;
                this.hour = hour;
                this.minute = minute;
                this.second = second;
                this.format = FORMAT.LOCAL;
                break;
            default:
                let hour_: number;
                if (this.localType === LOCAL_TYPE.AM) {
                    hour_ = this.hour === 12 ? 0: this.hour;
                }
                else {
                    hour_ =  this.hour === 12 ? 12: this.hour + 12;
                }
                this.hour = hour_;
                this.format = FORMAT.GLOBAL;
                break;
        }
    };

    transformHourLocalToGlobal() {
        if (this.format === FORMAT.LOCAL) {
            if (this.localType === LOCAL_TYPE.AM) {
                return this.hour === 12 ? 0: this.hour;
            }
            else {
                return this.hour === 12 ? 12: this.hour + 12;
            }
        }
        else {
            return this.hour
        }
    }

    setDate(date: Date) {
        const nowStr: string = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: this.format === FORMAT.LOCAL });
        const [hour, minute, second]: number[] = nowStr.split(':').map((value) => parseInt(value));
        this.hour = hour;
        this.minute = minute;
        this.second = second;
        if (this.format === FORMAT.LOCAL) {
            this.localType = nowStr.split(' ')[1] as LOCAL_TYPE;
        }
    }

    start(callback: () => void): void {
        const that: Time = this;
        const currentHour = this.hour;
        const currentMinute = this.minute;
        this.timer = setInterval(() => {
            let now = new Date()
            let hour: number = that.mode === MODE.EDIT_HOUR? currentHour: that.transformHourLocalToGlobal();
            let minute: number = that.mode === MODE.EDIT_MINUTE? currentMinute: this.minute;
            let second: number = this.second;
            
            now.setHours(hour, minute, second)
            now = new Date(now.getTime() + 1000)
            this.setDate(now)
            callback()
        }, 1000)
    };

    reset(): void {
        const now = new Date();
        const nowStr: string = now.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: this.format === FORMAT.LOCAL, timeZone: this.timeZone });
        const [hour, minute, second]: number[] = nowStr.split(':').map((value) => parseInt(value));
        this.hour = hour;
        this.minute = minute;
        this.second = second;
        this.format = FORMAT.GLOBAL;
    }

    display(): string {

        const hour: string = this.hour < 10? `0${this.hour}`: this.hour.toString();
        const minute: string = this.minute < 10? `0${this.minute}`: this.minute.toString();
        const second: string = this.second < 10? `0${this.second}`: this.second.toString();

        if (this.format === FORMAT.GLOBAL) {
            return `${hour}:${minute}:${second}`;
        }
        else {
            return `${hour}:${minute}:${second} ${this.localType}`
        }
    }
    
}