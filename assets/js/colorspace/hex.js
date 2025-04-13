export default class Hex {
    static toRGB(hex) {
        const r = parseInt(hex.substring(1, 3), 16);
        const g = parseInt(hex.substring(3, 5), 16);
        const b = parseInt(hex.substring(5, 7), 16);

        return {r: r / 255, g: g / 255, b: b / 255};
    }

    static fromRGB(r, g, b) {
        const red = parseInt(Math.round(r * 255)).toString(16).padStart(2, '0');
        const green = parseInt(Math.round(g * 255)).toString(16).padStart(2, '0');
        const blue = parseInt(Math.round(b * 255)).toString(16).padStart(2, '0');
        return `#${red}${green}${blue}`;
    }
}