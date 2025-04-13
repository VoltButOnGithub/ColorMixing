import Dropzone from "../util/drag-and-drop/dropzone.js";
import Pot from "./pot.js";

export default class PotContainer extends Dropzone {
    constructor(element) {
        super(element, ["pot"]);
        document.getElementById("create-pot-button").addEventListener("click", this.createPot)
        this.createPot();
    }

    createPot = () => {
        this.addItem(new Pot());
    }
}

document.querySelectorAll('.pot-container').forEach(e => {
    new PotContainer(e);
})