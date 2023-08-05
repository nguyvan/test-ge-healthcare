import { WatchManager } from "./class/watch/watchManager.class";
import './index.css';
import { Point } from "./lib/animation/src/class/point.class";
import { Animation } from "./lib/animation";

const start = new Point(1, 2)
const moving = new Point(3, 4)

const animation = new Animation()

const matrix = animation.translate(start, moving)

const watchManager = new WatchManager();
