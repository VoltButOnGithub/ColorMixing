import {TEXTURE, textureFromString} from "../color/texture.js";

export default class TextureSelector {
    colorForm;

    selectElement = document.getElementById("texture");
    currentOption = TEXTURE.SMOOTH.value;

    constructor(colorForm) {
        this.colorForm = colorForm;
        this.selectElement.innerHTML = '';
        Object.entries(TEXTURE).forEach(([key, texture]) => {
            const option = document.createElement('option');
            option.value = texture.value;
            option.textContent = texture.name;
            this.selectElement.appendChild(option);
        });
        this.selectElement.addEventListener('change', this.onChange);
    }

    onChange = (e) => {
        this.colorForm.colorPreview.texture = textureFromString(this.selectElement.value);
        this.currentOption = this.selectElement.value;
    }
}

