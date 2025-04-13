import {dragState} from './drag-and-drop.js';
import Dropzone from "./dropzone.js";

export default class Draggable extends Dropzone {
    #locked = false;

    constructor(element, type = "none", acceptsTypes = [], limit = Infinity, locked = false) {
        super(element, acceptsTypes, limit);
        this.element = element;
        this.currentDropzone = null;
        this.element.setAttribute('draggable', !locked);
        this.type = type;
        this.#locked = locked;

        this.element.addEventListener('dragstart', this.onDrag);
        this.element.addEventListener('dragend', this.onDragEnd);
    }

    onDrag = (e) => {
        if (this.locked) {
            return;
        }
        if (dragState.current !== null) {
            return;
        }
        this.element.classList.add('dragging');
        dragState.current = this;
    }

    canDrop(item) {
        if (this.#locked) {
            return false;
        }
        return super.canDrop(item);
    }

    set locked(locked) {
        this.element.setAttribute('draggable', !locked);
        this.#locked = locked;
    }

    get locked() {
        return this.#locked;
    }

    onDragEnd = () => {
        this.element.classList.remove('dragging');
        dragState.current = null;
    }
}