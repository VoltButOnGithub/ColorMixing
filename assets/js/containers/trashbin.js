import Dropzone from "../util/drag-and-drop/dropzone.js";

export default class TrashBin extends Dropzone {
    constructor(element) {
        super(element, ["color", "pot", "mixer"]);
        document.getElementById('trashbin-empty-button').addEventListener('click', e => {
            e.preventDefault();
            this.clear();
        })
    }
}

document.querySelectorAll('.trashbin').forEach(e => {
    new TrashBin(e);
})
