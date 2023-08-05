import { MODE } from "../../constant";
import { TimeI } from "../../interface/time.interface";
import { WatchI } from "../../interface/watch.interface";
import { Button } from "./button.class";


export class ButtonMode extends Button {

    onPress(time: TimeI, watch: WatchI) {
        switch (time.mode) {
            case MODE.DISABLED:
                time.mode = MODE.EDIT_HOUR;
                watch.blinkHour();
                break;
            case MODE.EDIT_HOUR:
                time.mode = MODE.EDIT_MINUTE;
                watch.blinkMinute();
                break;
            default:
                time.mode = MODE.DISABLED;
                watch.unBlink();
                break;
        }
    }

}