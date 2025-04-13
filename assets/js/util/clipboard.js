export default class Clipboard {
    static copy(text) {
        navigator.clipboard.writeText(text);
    }

    static paste() {
        return navigator.clipboard.readText()
            .then((text) => {
                return text;
            });
    }
}