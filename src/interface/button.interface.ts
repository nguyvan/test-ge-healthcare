import { TimeI } from "./time.interface";
import { WatchI } from "./watch.interface";

export interface ButtonI {
    onPress: (time?: TimeI, watch?: WatchI) => void;
}