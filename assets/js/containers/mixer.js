import {mixerTemplate} from "../templates/mixer-template.js";
import Draggable from "../util/drag-and-drop/draggable.js";
import {weatherState} from "../weather/weather-state.js";
import {randomFromArray} from "../util/math-functions.js";

export default class Mixer extends Draggable {
    constructor() {
        super(mixerTemplate(() => {
            this.mix();
        }), "mixer", ["pot"], 1);
        this.startingColors = [];
        this.startTime = null;
        this.animationStage = -1;
        this.overlay = document.createElement('div');
        this.overlay.classList.add('mixing-overlay');
        this.overlay.style.display = 'none';
        this.whisk = this.element.getElementsByClassName('whisk')[0];
        this.result = null;
        weatherState.onChange.push(this.onWeatherChange);
        this.onWeatherChange();
    }

    canDrop(item) {
        this.updateButton();
        return super.canDrop(item);
    }

    addItem(item) {
        super.addItem(item);
        this.updateButton();
    }

    removeItem(item) {
        super.removeItem(item);
        this.updateButton();
    }

    mix = () => {
        this.updateButton();
        if (!this.canMix()) return;
        this.items[0].locked = true;
        this.locked = true;
        this.startingColors = Array.from(this.items[0].items);
        this.mixingTime = this.findMaxMixingTime(this.items[0].items);
        if(weatherState.current.temperature <= 15) {
            this.mixingTime *= 1.15;
        }
        if(weatherState.current.precipitation > 0) {
            this.mixingTime *= 1.10;
        }
        this.result = this.items[0].mixContent();
        weatherState.mixersMixing++;
        this.doAnimation();
        this.updateButton();
    }

    doAnimation = (progress = 0) => {
        if (progress === 0) {
            this.initAnimation();
            return;
        }
        if (1 > progress > 0) {
            this.mixingAnimation(progress);
            return;
        }
        if (progress > 1) {
            this.finishAnimation();
            return;
        }
    }

    initAnimation = () => {
        this.animationStage = 1;
        this.overlay.style.display = 'block';
        this.overlay.style.backgroundColor = this.result.color.hex;

        this.whisk.style.display = 'block';
        this.whisk.style.animationDuration = `${1 / (this.items[0].mixingSpeed * 0.1)}s`;
        this.whisk.style.transition = 'top 0.5s ease-in-out';
        this.whisk.style.top = '-150%';

        this.items[0].element.style.position = 'relative';
        const startingHexValues = this.startingColors.map(color => `, ${color.hex}`).join('');
        const interpolationMethod = randomFromArray(this.startingColors).texture.cssInterpolationMethod;
        this.items[0].element.style.background = `linear-gradient(to bottom in ${interpolationMethod} ${startingHexValues})`;

        this.items[0].element.appendChild(this.overlay);

        setTimeout(() => {
            this.whisk.style.top = '200%';
            this.startTime = Date.now();
            this.whisk.addEventListener('transitionend', this.startMixAnimation);
        }, 10);
    }

    startMixAnimation = () => {
        this.whisk.removeEventListener('transitionend', this.startMixAnimation);
        this.mixingAnimation(0);
    }

    mixingAnimation = (progress = 0) => {
        this.overlay.style.display = 'block';
        this.overlay.style.opacity = `${progress}`;
        if (progress >= 1) {
            this.finishAnimation();
            return;
        }
        this.overlay.style.transition = `opacity ${Math.round(this.mixingTime * (1 - progress))}ms ease-in-out`;
        setTimeout(() => {
            this.overlay.style.opacity = `1`;
            this.overlay.addEventListener('transitionend', this.finishAnimation);
        }, 10);
    }

    finishAnimation = () => {
        this.overlay.removeEventListener('transitionend', this.finishAnimation);
        this.animationStage = -1;
        this.overlay.style.display = 'none';
        this.overlay.style.opacity = '0';
        this.whisk.style.top = '-150%';

        setTimeout( () => {
            this.whisk.addEventListener('transitionend', this.hideWhisk);
        }, 10);

        this.items[0].element.style.background = "";
        this.items[0].addItem(this.result);
        this.items[0].locked = false;
        this.locked = false;
        weatherState.mixersMixing--;
        this.updateButton();
    }

    hideWhisk = () => {
        this.whisk.removeEventListener('transitionend', this.hideWhisk);
        this.whisk.style.display = 'none';
    }

    continueAnimation() {
        if (this.animationStage < 0) {
            this.whisk.removeEventListener('transitionend', this.hideWhisk);
            return;
        }
        let elapsedTime = Date.now() - this.startTime;
        let progress = elapsedTime / this.mixingTime;
        this.doAnimation(progress);
    }

    updateButton = () => {
        if (this.canMix()) {
            this.element.children[0].children.namedItem("start-button").removeAttribute("disabled");
        } else {
            this.element.children[0].children.namedItem("start-button").setAttribute("disabled", "");
        }
    }

    canMix() {
        if (this.items.length < 1 || this.items[0].items.length < 2) {
            return false;
        }
        if (weatherState.current.temperature > 30) {
            if (weatherState.mixersMixing >= 1) return false;
        }
        return true;
    }

    findMaxMixingTime(items) {
        let maxMixingTime = 1;
        items.forEach((item) => {
            if (item.mixingTime > maxMixingTime) {
                maxMixingTime = item.mixingTime;
            }
        })
        return maxMixingTime;
    }

    onWeatherChange = () => {
        if(weatherState.current.temperature <= 10) {
            this.element.classList.add("cold");
        }
        if(weatherState.current.temperature > 10) {
            this.element.classList.remove("cold");
        }
        if(weatherState.current.precipitation > 0) {
            this.element.classList.add("wet");
        }
        if(weatherState.current.precipitation <= 0) {
            this.element.classList.remove("wet");
        }
    }
}