import { MODE_DISPLAY } from "../../constant";
import { TimeI } from "../../interface/time.interface";
import { WatchI } from "../../interface/watch.interface";
import { Button } from "./button.class";


export class ButtonLight extends Button {

    onPress(time: TimeI, watch: WatchI) {
        const element = document.getElementById(`watch-${watch.index}`);
        if (watch.mode === MODE_DISPLAY.LIGHT) {
            element.className = `watch dark`;
            watch.mode = MODE_DISPLAY.DARK;
            watch.digits.get('lightButton').innerHTML = MODE_DISPLAY.LIGHT;
        }
        else {
            element.className = `watch light`;
            watch.mode = MODE_DISPLAY.LIGHT;
            watch.digits.get('lightButton').innerHTML = MODE_DISPLAY.DARK;
        }
    }

}