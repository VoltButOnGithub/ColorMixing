import Draggable from "../util/drag-and-drop/draggable.js";
import {potTemplate} from "../templates/pot-template.js";
import ColorView from "../color/color-view.js";
import ColorModel from "../color/color-model.js";
import {randomFromArray} from "../util/math-functions.js";

export default class Pot extends Draggable {
    constructor() {
        super(potTemplate(), "pot", ["color"]);
        this.mixingSpeed = 0;
    }

    mixContent() {
        while(this.items.length > 1) {
            let c1 = this.popItem();
            let c2 = this.popItem();
            let newRGB = c1.texture.mixFunction(c1.r, c1.g, c1.b, c2.r, c2.g, c2.b);
            this.addItem(new ColorView(
                new ColorModel(
                    newRGB.r,
                    newRGB.g,
                    newRGB.b,
                    c1.mixingSpeed,
                    Math.max(c1.mixingTime, c2.mixingTime),
                    randomFromArray([c1.texture, c2.texture]))));
        }
        return this.popItem();
    }

    canDrop(item) {
        if (!super.canDrop(item)) {
            return false;
        }
        if (this.mixingSpeed > 0 && item.mixingSpeed !== this.mixingSpeed) {
            return false;
        }
        return true;
    }

    addItem(item) {
        if(this.mixingSpeed === 0) {
            this.mixingSpeed = item.mixingSpeed;
        }
        super.addItem(item);
    }

    removeItem(item) {
        super.removeItem(item);
        if(this.items.length === 0) {
            this.mixingSpeed = 0;
        }
    }
}
