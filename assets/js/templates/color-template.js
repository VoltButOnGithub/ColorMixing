export const colorTemplate = (color) => {
    const div = document.createElement('div');
    div.className = 'color';
    div.innerHTML = `
        <p class="color-hex ${color.texture.value}-hex">${color.hex}</p>
        <p class="mix-speed">Speed: ${color.mixingSpeed}</p>
    `;
    return div;
};