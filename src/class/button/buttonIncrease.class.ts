import { MODE } from "../../constant";
import { TimeI } from "../../interface/time.interface";
import { WatchI } from "../../interface/watch.interface";
import { Button } from "./button.class";


export class ButtonIncrease extends Button {

    onPress(time: TimeI, watch: WatchI) {
        switch (time.mode) {
            case MODE.DISABLED:
                watch.unBlink();
                break;
            case MODE.EDIT_HOUR:
                time.increaseHour();
                watch.blinkHour();
                break;
            default:
                time.increaseMinute();
                watch.blinkMinute();
                break;
        }
    }
}