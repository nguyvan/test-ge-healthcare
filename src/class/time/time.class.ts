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

    /**
     * Increase hour based on current time format (12h/24h)
     * Used to set custom time for the watch
     */
    public increaseHour(): void {
        if (this.format === FORMAT.GLOBAL) {
            this.hour++;
            if (this.hour >= 24) {
                this.hour = 0;
            }
        }
        else {
            this.hour++;
            if (this.localType === LOCAL_TYPE.AM) {
                if (this.hour === 12) {
                    this.localType = LOCAL_TYPE.PM;
                }
                this.hour = this.hour === 12? 12: this.hour % 12;
            }
            else {
                if (this.hour === 12) {
                    this.localType = LOCAL_TYPE.AM;
                }
                this.hour = this.hour === 12? 12: this.hour % 12;
            }
        }
    }

    /**
     * Increase minute
     * Used to set custom time for the watch
     */
    public increaseMinute() {
        this.minute++;
        if (this.minute >= 60) {
            this.minute = 0;
        }
    }

    /**
     * Change time format of the watch : 24H <-> 12H
     */
    public changeFormat() {
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

    /**
     * Returns the time of watch after changing time format
     * 
     * @returns The current hour of the watch after changing time format
     */
    public transformHourLocalToGlobal(): number {
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

    /**
     * Update the date for the watch
     * 
     * @param date - New date to update
     */
    public setDate(date: Date): void {
        const nowStr: string = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: this.format === FORMAT.LOCAL });
        const [hour, minute, second]: number[] = nowStr.split(':').map((value) => parseInt(value));
        this.hour = hour;
        this.minute = minute;
        this.second = second;
        if (this.format === FORMAT.LOCAL) {
            this.localType = nowStr.split(' ')[1] as LOCAL_TYPE;
        }
    }

    /**
     * Start the timer
     * Update time of the watch each second
     * @param callback - Function to call in the interval
     */
    public start(callback: () => void): void {
        const that: Time = this;
        this.timer = setInterval(() => {
            let now = new Date()
            let hour: number = that.transformHourLocalToGlobal();
            let minute: number = this.minute;
            let second: number = this.second;
            now.setHours(hour, minute, second)
            now = new Date(now.getTime() + 1000)
            this.setDate(now)
            callback()
        }, 1000)
    };

    /**
     * Reset time of the watch
     */
    public reset(): void {
        const now = new Date();
        const nowStr: string = now.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: this.format === FORMAT.LOCAL, timeZone: this.timeZone });
        const [hour, minute, second]: number[] = nowStr.split(':').map((value) => parseInt(value));
        this.hour = hour;
        this.minute = minute;
        this.second = second;
        this.format = FORMAT.GLOBAL;
    }

    /**
     * Returns time as type string for displaying
     *
     * @returns the display string of time
     */
    public display(): string {
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