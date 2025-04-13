import {getAverage, limitBetween} from "../util/math-functions.js";

export default class LRGB {
    static toRGB(r, g, b) {
        r = fromLinear(r);
        g = fromLinear(g);
        b = fromLinear(b);

        r = limitBetween(r, 0, 1);
        g = limitBetween(g, 0, 1);
        b = limitBetween(b, 0, 1);
        return {r: r, g: g, b: b}
    }

    static fromRGB(r, g, b) {
        return {r: toLinear(r), g: toLinear(g), b: toLinear(b)}
    }

    static mix(r1, g1, b1, r2, g2, b2) {
        let lRGB1 = LRGB.fromRGB(r1, g1, b1);
        let lRGB2 = LRGB.fromRGB(r2, g2, b2);
        let mixedLR = getAverage(lRGB1.r, lRGB2.r);
        let mixedLG = getAverage(lRGB1.g, lRGB2.g);
        let mixedLB = getAverage(lRGB1.b, lRGB2.b);
        return LRGB.toRGB(mixedLR, mixedLG, mixedLB);
    }
}

function toLinear(c) {
    if (c <= 0.04045) {
        return c / 12.92;
    }
    return (Math.sign(c) || 1) * Math.pow((c + 0.055) / 1.055, 2.4);
}

function fromLinear(c) {
    if (c > 0.0031308) {
        return (Math.sign(c) || 1) * (1.055 * Math.pow(c, 1 / 2.4) - 0.055);
    }
    return c * 12.92;
}