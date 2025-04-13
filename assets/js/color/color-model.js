import HSL from "../colorspace/hsl.js";
import Hex from "../colorspace/hex.js";

export default class ColorModel {
    constructor(r, g, b, mixingSpeed, mixingTime, texture) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.mixingSpeed = mixingSpeed;
        this.mixingTime = mixingTime;
        this.texture = texture;
    }

    get h() {
        return HSL.fromRGB(this.r, this.g, this.b).h;
    }

    get s() {
        return HSL.fromRGB(this.r, this.g, this.b).s;
    }

    get l() {
        return HSL.fromRGB(this.r, this.g, this.b).l;
    }

    get hex() {
        return Hex.fromRGB(this.r, this.g, this.b);
    }

    set h(h) {
        let oldHSL = HSL.fromRGB(this.r, this.g, this.b);
        ({r: this.r, g: this.g, b: this.b} = HSL.toRGB(h, oldHSL.s, oldHSL.l));
    }

    set s(s) {
        const oldHSL = HSL.fromRGB(this.r, this.g, this.b);
        ({r: this.r, g: this.g, b: this.b} = HSL.toRGB(oldHSL.h, s, oldHSL.l));
    }

    set l(l) {
        const oldHSL = HSL.fromRGB(this.r, this.g, this.b);
        ({r: this.r, g: this.g, b: this.b} = HSL.toRGB(oldHSL.h, oldHSL.s, l));
    }

    set hex(hex) {
        ({r: this.r, g: this.g, b: this.b} = Hex.toRGB(hex));
    }

    hueShifted(shift) {
        let newHue = this.h + shift;
        if (newHue < 0) newHue += 360;

        let rgb = HSL.toRGB(newHue, this.s, this.l);

        return new ColorModel(rgb.r, rgb.g, rgb.b, this.mixingSpeed, this.mixingTime, this.texture);
    }
}