import { TimeI } from "../../interface/time.interface";
import { WatchI } from "../../interface/watch.interface";
import { Button } from "./button.class";

export class ButtonDisplay extends Button {

    onPress(time: TimeI, watch: WatchI): void {
        time.changeFormat();
        watch.digits.get('displayButton').innerHTML = time.format;
    }

}