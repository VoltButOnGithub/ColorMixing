export default function showPopup(element) {
    const popup = document.createElement('div');
    popup.classList.add('popup');

    popup.appendChild(element);

    document.body.appendChild(popup);

    function removePopup() {
        document.body.removeChild(popup);
        document.removeEventListener('click', clickOutsideHandler);
    }

    function clickOutsideHandler(event) {
        if (!popup.contains(event.target) && event.target !== popup) {
            removePopup();
        }
    }

    setTimeout(() => {
        document.addEventListener('click', clickOutsideHandler);
    }, 0);
}
