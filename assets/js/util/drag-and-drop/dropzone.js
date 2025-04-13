import {dragState} from './drag-and-drop.js';

export default class Dropzone {
    constructor(element, acceptsTypes = [], limit = Infinity, locked = false) {
        this.element = element;
        this.items = [];
        this.limit = limit;
        this.acceptsTypes = acceptsTypes;

        this.element.addEventListener('dragover', this.onDragOver);
        this.element.addEventListener('dragenter', this.onDragEnter);
        this.element.addEventListener('drop', this.onDrop);
        this.element.addEventListener('dragleave', this.onDragLeave);
    }

    onDragOver = (e) => {
        e.preventDefault();
    }

    onDragEnter = (e) => {
        e.preventDefault();
        if (!this.canDrop(dragState.current)) {
            return;
        }
        this.element.classList.add('draghover');
    }

    onDrop = (e) => {
        if (!this.canDrop(dragState.current)) {
            return;
        }
        this.moveItem(dragState.current)
        dragState.current = null;
        this.element.classList.remove('draghover');
    }

    onDragLeave = (e) => {
        if (!this.canDrop(dragState.current)) {
            return;
        }
        if (this.element.contains(e.relatedTarget)) return;
        this.element.classList.remove('draghover');
    }

    canDrop(item) {
        if (dragState.current == null) {
            return false;
        }
        if (!this.acceptsTypes.includes(dragState.current.type)) {
            return false;
        }
        if (this.items.length >= this.limit) {
            return false;
        }
        return true;
    }

    removeItem(item) {
        const index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }

    popItem() {
        let item = this.items.pop();
        this.element.removeChild(item.element);
        return item;
    }

    moveItem(item) {
        if (item.currentDropzone !== null) {
            item.currentDropzone.removeItem(item);
        }
        this.addItem(item);
    }

    addItem(item) {
        this.element.appendChild(item.element);
        this.items.push(item);
        item.currentDropzone = this;
    }

    replaceItems(newItems) {
        let oldItems = Array.from(this.items);
        this.clear();
        if (newItems === null || newItems === undefined) {
            return oldItems;
        }
        newItems.forEach((item) => {
            this.addItem(item);
        });
        return oldItems;
    }

    clear() {
        this.items = [];
        this.element.innerHTML = '';
    }
}