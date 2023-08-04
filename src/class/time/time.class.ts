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

    constructor(timeZone: string) { 
        this.timeZone = timeZone;
        this.mode = MODE.DISABLED,
        this.format = FORMAT.GLOBAL;
        this.reset();
        this.localType = this.format === FORMAT.GLOBAL? (this.hour >= 12? LOCAL_TYPE.PM: LOCAL_TYPE.AM): LOCAL_TYPE.PM 
    }

    increaseHour() {

    }

    increaseMinute() {

    }

    changeFormat() {
        switch (this.format) {
            case FORMAT.GLOBAL:
                let now = new Date();
                now.setHours(this.hour, this.minute, this.second);
                const nowStr: string = now.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true, timeZone: this.timeZone });
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

    }

    start(): void {
        const that: Time = this;
        this.timer = setInterval(() => {
            let now = new Date()
            let hour: number = that.transformHourLocalToGlobal();
            let minute: number = this.minute;
            let second: number = this.second;
            
            now.setHours(hour, minute, second)
            now.setDate(now.getDate() + 1000);

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

    display() {
        return ''
    }
    
}