export const triadicSchemeTemplate = (color1, color2, color3) => {
    const div = document.createElement('div');
    div.className = 'scheme';
    div.innerHTML = `
        <p>Triadic scheme for ${color1.hex}</p>
        <div class="row triadic-colors">
            
        </div>
    `;
    div.getElementsByClassName("triadic-colors")[0].appendChild(color2.element);
    div.getElementsByClassName("triadic-colors")[0].appendChild(color1.element);
    div.getElementsByClassName("triadic-colors")[0].appendChild(color3.element);
    return div;
};