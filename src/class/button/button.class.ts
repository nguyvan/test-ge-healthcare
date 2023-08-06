import { ButtonI } from "../../interface/button.interface";
import { TimeI } from "../../interface/time.interface";
import { WatchI } from "../../interface/watch.interface";


export class Button implements ButtonI{
    /**
     * Callback when a watch's button is clicked
     * 
     * @param time - time of the watch
     * @param watch - the watch needs to be handled
     * 
     * @virtual
     */
    public onPress(time?: TimeI, watch?: WatchI) {}
}