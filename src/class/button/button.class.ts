import { ButtonI } from "../../interface/button.interface";
import { TimeI } from "../../interface/time.interface";
import { WatchI } from "../../interface/watch.interface";


export class Button implements ButtonI{

    onPress(time?: TimeI, watch?: WatchI) {
        // abstract function
    }
}