import { MODE } from "../../constant";
import { TimeI } from "../../interface/time.interface";
import { WatchI } from "../../interface/watch.interface";
import { Button } from "./button.class";

export class ButtonReset extends Button {

    onPress(time: TimeI, watch: WatchI): void {
        time.reset();
        watch.reset();
        time.mode = MODE.DISABLED;
        watch.unBlink();
    }

}