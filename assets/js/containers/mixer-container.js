import Mixer from "./mixer.js";
import Dropzone from "../util/drag-and-drop/dropzone.js";
import {weatherState} from "../weather/weather-state.js";

export default class MixerContainer extends Dropzone {
    constructor(element) {
        super(element, ["mixer"]);
        document.getElementById("create-mixer-button").addEventListener("click", this.createMixer);
        this.createMixer();
        this.tabs = [];
        this.currentTabIndex = 0;
        document.querySelectorAll(".mixer-tab-button").forEach( (button, index)=> {
            button.addEventListener("click", () => this.switchToTab(index));
        });
        weatherState.onChange.push(this.onWeatherChange);
        this.onWeatherChange();
    }

    createMixer = () => {
        this.addItem(new Mixer());
    }

    switchToTab(tabIndex) {
        if(tabIndex === this.currentTabIndex) {
            return;
        }
        this.tabs[this.currentTabIndex] = this.replaceItems(this.tabs[tabIndex]);
        this.currentTabIndex = tabIndex;
        this.items.forEach((item) => {
            item.continueAnimation();
        })
    }

    onWeatherChange = () => {
        if(weatherState.current.temperature >= 30) {
            this.element.classList.add('hot');
        }
        if(weatherState.current.temperature < 30) {
            this.element.classList.remove('hot');
        }
    }

}

document.querySelectorAll('.mixer-container').forEach(e => {
    new MixerContainer(e);
})