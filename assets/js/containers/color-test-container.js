import ColorContainer from "./color-container.js";
import {limitBetween} from "../util/math-functions.js";

export default class ColorTestContainer {
    constructor(element) {
        this.element = element;
        this.gridSizeInput = document.getElementById("test-grid-size");
        this.colorContainers = [];
        this.gridSizeInput.addEventListener("change", this.onGridSizeChange);
        this.onGridSizeChange();
    }

    onGridSizeChange = (event) => {
        this.gridSizeInput.value = this.gridSizeInput.value.replace(/[^0-9]/g, '');
        this.gridSizeInput.value = limitBetween(this.gridSizeInput.value, this.gridSizeInput.value, this.gridSizeInput.value);
        this.createGrid(this.gridSizeInput.value);
    }

    createGrid = (size) => {
        this.element.innerHTML = '';
        this.colorContainers = [];

        const gridSize = parseInt(size, 10) || 0;

        this.element.style.display = 'grid';
        this.element.style.gridTemplateColumns = `repeat(${gridSize}, 0fr)`;

        for (let i = 0; i < gridSize * gridSize; i++) {
            const container = document.createElement('div');
            container.className = 'container color-container test-container';
            this.element.appendChild(container);
            this.colorContainers.push(container);
            new ColorContainer(container, 1);
        }
    }
}




document.querySelectorAll('.test-grid-container').forEach(e => {
    new ColorTestContainer(e);
})