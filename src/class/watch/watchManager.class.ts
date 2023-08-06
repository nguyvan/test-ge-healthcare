import { listTimeZone } from "../../constant/listTimezone.constant";
import { WatchI } from "../../interface/watch.interface";
import { WatchManagerI } from "../../interface/watchManager.interface";
import { Watch } from "./watch.class";



export class WatchManager implements WatchManagerI {

    public watches: WatchI[];
    public nbWatch: number;
    public listTimeZone: string[];
    public selectedTimeZone: string;

    constructor() {
        this.watches = []
        this.nbWatch = 0;
        this.listTimeZone = listTimeZone;
        this.selectedTimeZone = '';
        this.init();
    }

    /**
     * Add a new watch with a selected timezone
     */
    public addWatch(){
        if (this.selectedTimeZone) {
            const watch = new Watch(this.selectedTimeZone, this.nbWatch);
            watch.run();
            this.watches.push(watch);
            this.nbWatch++;
        }   
    }

    /**
     * Select a timezone in the list
     */
    public select() {
        const selectedBox: HTMLSelectElement = document.getElementById("selector-timezone") as HTMLSelectElement;
        const index = selectedBox.selectedIndex;
        const selectedValue = selectedBox.options[index].value;
        this.selectedTimeZone = selectedValue;
    }

    /**
     * Init all elements of the watch
     */
    public init() {
        const listWatchesElement = document.createElement('div');
        listWatchesElement.id = 'list-watches';

        const selectElement = document.createElement('select');
        selectElement.id = 'selector-timezone';
        selectElement.addEventListener('change', this.select.bind(this));

        for (let timezone of this.listTimeZone) {
            const optionElement = document.createElement('option');
            optionElement.value = timezone;
            optionElement.innerHTML = timezone || 'Select a timezone';
            selectElement.appendChild(optionElement);
        }
        
        const buttonElement = document.createElement('button');
        buttonElement.innerHTML = 'Add';
        buttonElement.addEventListener('click', this.addWatch.bind(this));

        const containerElement = document.createElement('div');
        containerElement.className = 'container';
        containerElement.appendChild(selectElement);
        containerElement.appendChild(buttonElement);

        const root = document.getElementById('root');
        root.appendChild(containerElement);
        root.appendChild(listWatchesElement);
    }
}