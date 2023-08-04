import { TimeI } from "./time.interface";

export interface ButtonI {
    onPress: (time: TimeI) => void;
}