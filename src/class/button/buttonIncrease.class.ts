import { MODE } from "../../constant";
import { TimeI } from "../../interface/time.interface";
import { Button } from "./button.class";


export class ButtonIncrease extends Button {

    onPress(time: TimeI) {
        switch (time.mode) {
            case MODE.DISABLED:
                break;
            case MODE.EDIT_HOUR:
                time.increaseHour();
                break;
            default:
                time.increaseMinute();
                break;
        }
    }
}