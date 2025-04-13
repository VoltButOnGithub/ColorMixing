import Clipboard from "../util/clipboard.js";

export default class ColorPicker {
    colorForm;

    rSlider = document.getElementById("red");
    gSlider = document.getElementById("green");
    bSlider = document.getElementById("blue");
    rgbSliders = [this.rSlider, this.gSlider, this.bSlider];

    hSlider = document.getElementById("hue");
    sSlider = document.getElementById("saturation");
    lSlider = document.getElementById("lightness");
    hslSliders = [this.hSlider, this.sSlider, this.lSlider];

    hexInput = document.getElementById("hex");
    hexCopyButton = document.getElementById("hex-copy");
    hexPasteButton = document.getElementById("hex-paste");

    constructor(colorForm) {
        this.colorForm = colorForm;
        this.rgbSliders.forEach(e => {
            e.addEventListener("input", this.onRgbInput);
        });
        this.hslSliders.forEach(e => {
            e.addEventListener("input", this.onHslInput);
        });
        this.hexInput.addEventListener("input", this.onHexInput);
        this.hexCopyButton.addEventListener("click", this.copyHex);
        this.hexPasteButton.addEventListener("click", this.pasteHex);
    }

    init() {
        this.onHexInput();
        this.onAnyInput();
    }

    onAnyInput = () => {
        this.#updateHSLSlidersBackgrounds();
        this.#updateRGBSlidersBackgrounds();
    }

    onRgbInput = () => {
        this.colorForm.colorPreview.r = parseFloat(this.rSlider.value);
        this.colorForm.colorPreview.g = parseFloat(this.gSlider.value);
        this.colorForm.colorPreview.b = parseFloat(this.bSlider.value);
        this.#updateHSLSliders();
        this.#updateHexInput();
        this.onAnyInput();
    }

    onHslInput = () => {
        this.colorForm.colorPreview.h = parseFloat(this.hSlider.value);
        this.colorForm.colorPreview.s = parseFloat(this.sSlider.value);
        this.colorForm.colorPreview.l = parseFloat(this.lSlider.value);
        this.#updateRGBSliders();
        this.#updateHexInput();
        this.onAnyInput();
    }

    #updateHSLSliders = () => {
        if (this.colorForm.colorPreview.l !== 0 &&
            this.colorForm.colorPreview.l !== 1 &&
            this.colorForm.colorPreview.s !== 0) {
            this.hSlider.value = this.colorForm.colorPreview.h;
        }
        this.sSlider.value = this.colorForm.colorPreview.s;
        if (this.colorForm.colorPreview.l === 1) {
            this.sSlider.value = 1;
        }
        this.lSlider.value = this.colorForm.colorPreview.l;
    }

    #updateRGBSliders() {
        this.rSlider.value = this.colorForm.colorPreview.r;
        this.gSlider.value = this.colorForm.colorPreview.g;
        this.bSlider.value = this.colorForm.colorPreview.b;
    }

    #updateHexInput() {
        this.hexInput.value = this.colorForm.colorPreview.hex;
    }

    onHexInput = () => {
        this.hexInput.value = "#" + this.hexInput.value.substring(1, 7).replace(/[^a-fA-F0-9]/g, '');
        this.colorForm.colorPreview.hex = this.hexInput.value.padEnd(7, '0');
        this.#updateRGBSliders();
        this.#updateHSLSliders();
        this.onAnyInput();
    }

    copyHex = () => {
        Clipboard.copy(this.hexInput.value);
    }

    pasteHex = async () => {
        const pastedText = await Clipboard.paste();
        this.hexInput.value = "#" + pastedText.replace(/[^a-fA-F0-9]/g, '').substring(0, 6);
        this.onHexInput();
    }

    #updateHSLSlidersBackgrounds() {
        this.hSlider.style.background = `linear-gradient(to right in hsl longer hue,
        hsl(0, ${this.sSlider.value * 100}%, ${this.lSlider.value * 100}%),
        hsl(360, ${this.sSlider.value * 100}%, ${this.lSlider.value * 100}%)
    )`;
        this.sSlider.style.background = `linear-gradient(to right,
        hsl(${this.hSlider.value}, 0%, ${this.lSlider.value * 100}%),
        hsl(${this.hSlider.value}, 100%, ${this.lSlider.value * 100}%)
    )`;

        this.lSlider.style.background = `linear-gradient(to right,
        hsl(${this.hSlider.value}, ${this.sSlider.value * 100}%, 0%),
        hsl(${this.hSlider.value}, ${this.sSlider.value * 100}%, 50%),
        hsl(${this.hSlider.value}, ${this.sSlider.value * 100}%, 100%)
    )`;
    }

    #updateRGBSlidersBackgrounds() {
        this.rSlider.style.background = `linear-gradient(
            to right,
            red ${this.rSlider.value * 100}%,
            white ${this.rSlider.value * 100}% 100%
        )`;
        this.gSlider.style.background = `linear-gradient(
            to right,
            #00ff00 ${this.gSlider.value * 100}%,
            white ${this.gSlider.value * 100}% 100%
        )`;
        this.bSlider.style.background = `linear-gradient(
            to right,
            #0000ff ${this.bSlider.value * 100}%,
            white ${this.bSlider.value * 100}% 100%
        )`;
    }
}

