import Dropzone from "../util/drag-and-drop/dropzone.js";

export default class ColorContainer extends Dropzone {
    constructor(element, limit = Infinity) {
        super(element, ["color"], limit);
    }
}


