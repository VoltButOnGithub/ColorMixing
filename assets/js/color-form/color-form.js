import ColorPicker from "./color-picker.js";
import TextureSelector from "./texture-selector.js";
import ColorContainer from "../containers/color-container.js";
import RandomColor from "../color/random-color.js";
import ColorView from "../color/color-view.js";
import {TEXTURE, textureFromString} from "../color/texture.js";
import ColorModel from "../color/color-model.js";
import {limitBetween} from "../util/math-functions.js";

class ColorForm {
    constructor() {
        const colorPreviewElement = document.getElementById("color-preview");
        const colorModel = new ColorModel(1, 0, 0, undefined, undefined, TEXTURE.SMOOTH);
        this.colorPreview = new ColorView(colorModel, true, colorPreviewElement);
        this.mainColorContainer = new ColorContainer(document.getElementById("main-color-container"));
        this.colorPicker = new ColorPicker(this);
        this.mixingTime = document.getElementById("mixing-time");
        this.mixingTime.addEventListener("input", this.onMixingTimeInput);
        this.mixingSpeed = document.getElementById("mixing-speed");
        this.mixingSpeed.addEventListener("input", this.onMixingSpeedInput);
        this.createButton = document.getElementById("create-color-button");
        this.createButton.addEventListener("click", this.createColor);
        this.createRandomButton = document.getElementById("create-random-color-button");
        this.createRandomButton.addEventListener("click", this.createRandomColor);
        this.textureSelector = new TextureSelector(this);
        this.colorPicker.init();
    }

    createColor = (e) => {
        e.preventDefault();
        const mixingSpeed = parseInt(this.mixingSpeed.value);
        const mixingTime = parseInt(this.mixingTime.value);
        const newColorModel = new ColorModel(
            this.colorPreview.r,
            this.colorPreview.g,
            this.colorPreview.b,
            mixingSpeed,
            mixingTime,
            textureFromString(this.textureSelector.currentOption));
        const newColor = new ColorView(newColorModel);
        this.mainColorContainer.addItem(newColor);
    }

    createRandomColor = (e) => {
        e.preventDefault();
        const newColor = RandomColor.createRandomColor();
        this.mainColorContainer.addItem(newColor);
    }

    onMixingTimeInput = () => {
        this.mixingTime.value = this.mixingTime.value.replace(/[^0-9]/g, '');
        this.mixingTime.value = limitBetween(this.mixingTime.value, this.mixingTime.min, this.mixingTime.max);
    }

    onMixingSpeedInput = () => {
        this.mixingSpeed.value = this.mixingSpeed.value.replace(/[^0-9]/g, '');
        this.mixingSpeed.value = limitBetween(this.mixingSpeed.value, this.mixingSpeed.min, this.mixingSpeed.max);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const colorForm = new ColorForm();
});