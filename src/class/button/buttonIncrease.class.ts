import { MODE } from "../../constant";
import { TimeI } from "../../interface/time.interface";
import { WatchI } from "../../interface/watch.interface";
import { Button } from "./button.class";


export class ButtonIncrease extends Button {
    /** @override */
    public onPress(time: TimeI, watch: WatchI) {
        switch (time.mode) {
            case MODE.DISABLED:
                break;
            case MODE.EDIT_HOUR:
                time.increaseHour();
                watch.update();
                break;
            default:
                time.increaseMinute();
                watch.update();
                break;
        }
    }
}