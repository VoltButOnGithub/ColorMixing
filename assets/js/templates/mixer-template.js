export const mixerTemplate = (mixFunction) => {
    const div = document.createElement('div');
    div.className = 'mixer';
    div.innerHTML = `
        <div class="mixer-header">
            <p>Mixer</p>
            <div class="whisk">
                <div class="rod rod-1"></div>
                <div class="rod"></div>
                <div class="circle circle-1"></div>
                <div class="circle"></div>
            </div>
        </div>
    `;
    const button = document.createElement('button');
    button.innerText = "Start";
    button.name = "start-button";
    button.setAttribute("disabled", "");
    button.addEventListener('click', mixFunction)
    div.children[0].appendChild(button);
    return div;
};