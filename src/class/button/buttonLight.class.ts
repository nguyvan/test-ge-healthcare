import { MODE_DISPLAY } from "../../constant";
import { WatchI } from "../../interface/watch.interface";
import { Button } from "./button.class";


export class ButtonLight extends Button {

    onPress(time: null, watch: WatchI) {
        const element = document.getElementById(`watch-${watch.index}`);
        if (watch.mode === MODE_DISPLAY.LIGHT) {
            element.className = `watch dark`;
            watch.mode = MODE_DISPLAY.DARK;
        }
        else {
            element.className = `watch light`;
            watch.mode = MODE_DISPLAY.LIGHT;
        }
    }

}