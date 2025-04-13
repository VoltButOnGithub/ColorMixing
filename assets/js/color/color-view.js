import Draggable from "../util/drag-and-drop/draggable.js";
import {colorTemplate} from "../templates/color-template.js";
import {triadicSchemeTemplate} from "../templates/triadic-scheme-template.js";
import showPopup from "../util/popup.js";

export default class ColorView extends Draggable {
    constructor(color, locked = false, element = colorTemplate(color)) {
        super(element, "color", undefined, undefined, locked);
        this.color = color;
        this.element.addEventListener("click", this.showTriadicScheme);
        this.update();
    }

    showTriadicScheme = () => {
        showPopup(triadicSchemeTemplate(
            new ColorView(this.color),
            new ColorView(this.color.hueShifted(120)),
            new ColorView(this.color.hueShifted(240))));
    }

    update = () => {
        this.texture.setStyle(this);
    }

    get r() {
        return this.color.r;
    }

    get g() {
        return this.color.g;
    }

    get b() {
        return this.color.b;
    }

    get h() {
        return this.color.h;
    }

    get s() {
        return this.color.s;
    }

    get l() {
        return this.color.l;
    }

    get hex() {
        return this.color.hex;
    }

    get mixingSpeed() {
        return this.color.mixingSpeed;
    }

    get mixingTime() {
        return this.color.mixingTime;
    }

    get texture() {
        return this.color.texture;
    }

    set r(r) {
        this.color.r = r;
        this.update();
    }

    set g(g) {
        this.color.g = g;
        this.update();
    }

    set b(b) {
        this.color.b = b;
        this.update();
    }

    set h(h) {
        this.color.h = h;
        this.update();
    }

    set s(s) {
        this.color.s = s;
        this.update();
    }

    set l(l) {
        this.color.l = l;
        this.update();
    }

    set hex(hex) {
        this.color.hex = hex;
        this.update();
    }

    set texture(texture) {
        this.color.texture = texture;
        this.update();
    }
}