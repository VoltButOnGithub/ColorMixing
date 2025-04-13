export const potTemplate = () => {
    const div = document.createElement('div');
    div.className = 'pot';
    div.innerHTML = `
        <p class="pot-header">Pot</p>
    `;
    return div;
};