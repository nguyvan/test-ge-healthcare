import { MODE } from "../../constant";
import { TimeI } from "../../interface/time.interface";
import { Button } from "./button.class";


export class ButtonMode extends Button {

    onPress(time: TimeI) {
        switch (time.mode) {
            case MODE.DISABLED:
                time.mode = MODE.EDIT_HOUR;
                break;
            case MODE.EDIT_HOUR:
                time.mode = MODE.EDIT_MINUTE;
                break;
            default:
                time.mode = MODE.DISABLED;
                break;
        }
    }

}