import { Watch } from "../class/watch/watch.class";
import { FORMAT, LOCAL_TYPE, MODE, MODE_DISPLAY } from "../constant";
import { WatchI } from "../interface/watch.interface";

const timezone = 'Europe/Paris'

describe('Watch mode and increase buttons clicked test', () => {
    let watch: WatchI;

    beforeEach((done) => {
        const rootElement = document.createElement('div')
        rootElement.id = 'root';
        const watchListElement = document.createElement('div')
        watchListElement.id = 'list-watches';
        rootElement.appendChild(watchListElement);
        document.body.appendChild(rootElement);

        watch = new Watch(timezone, 0);
        watch.time.hour = 13;
        watch.time.minute = 0;
        watch.time.second = 0;
        done();
    });

    beforeEach((done) => {
        document.body.innerHTML = '';
        done();
    });

    it('Increase 1 hour', () => {
        const currentHour = watch.time.hour;
        watch.buttonMode.onPress(watch.time, watch);
        watch.buttonIncrease.onPress(watch.time, watch);
        const newHour = watch.time.hour;
        expect(newHour - currentHour).toEqual(1);
    });

    it('Increase 1 minute', () => {
        const currentMinute = watch.time.minute;
        watch.buttonMode.onPress(watch.time, watch);
        watch.buttonMode.onPress(watch.time, watch)
        watch.buttonIncrease.onPress(watch.time, watch);
        const newMinute = watch.time.minute;
        expect(newMinute - currentMinute).toEqual(1);
    });

    it('Increase not affect when mode button is clicked 3 times', () => {
        const currentMinute = watch.time.minute;
        const currentHour = watch.time.hour;
        watch.buttonMode.onPress(watch.time, watch);
        watch.buttonMode.onPress(watch.time, watch)
        watch.buttonMode.onPress(watch.time, watch)
        watch.buttonIncrease.onPress(watch.time, watch);
        const newMinute = watch.time.minute;
        const newHour = watch.time.hour;
        expect(newMinute - currentMinute).toEqual(0);
        expect(newHour - currentHour).toEqual(0);
    });

})

describe('Watch change time format/button displayed clicked test', () => {
    let watch: WatchI;

    beforeEach((done) => {
        const rootElement = document.createElement('div')
        rootElement.id = 'root';
        const watchListElement = document.createElement('div')
        watchListElement.id = 'list-watches';
        rootElement.appendChild(watchListElement);
        document.body.appendChild(rootElement);

        watch = new Watch(timezone, 0);
        watch.time.hour = 13;
        watch.time.minute = 0;
        watch.time.second = 0;
        done();
    });

    beforeEach((done) => {
        document.body.innerHTML = '';
        done();
    });

    it('PM hour', () => {
        watch.time.hour = 13;
        watch.time.minute = 0;
        watch.time.second = 0;
        watch.buttonDisplay.onPress(watch.time, watch);
        expect(watch.time.hour).toEqual(1);
        // minute and second are not necessary to be tested
        expect(watch.time.format).toEqual(FORMAT.LOCAL);
        expect(watch.time.localType).toEqual(LOCAL_TYPE.PM);
    })

    it("AM hour", () => {
        watch.time.hour = 3;
        watch.time.minute = 0;
        watch.time.second = 0;
        watch.buttonDisplay.onPress(watch.time, watch);
        expect(watch.time.hour).toEqual(3)
        // minute and second are not necessary to be tested
        expect(watch.time.format).toEqual(FORMAT.LOCAL)
        expect(watch.time.localType).toEqual(LOCAL_TYPE.AM)
    })

    it("Change AM/PM format (12h) to default format (24h)", () => {
        watch.time.hour = 1;
        watch.time.minute = 0;
        watch.time.second = 0;
        watch.time.localType = LOCAL_TYPE.PM;
        watch.time.format = FORMAT.LOCAL;
        watch.buttonDisplay.onPress(watch.time, watch);
        expect(watch.time.hour).toEqual(13)
        // minute and second are not necessary to be tested
        expect(watch.time.format).toEqual(FORMAT.GLOBAL)
    })
})
