import {getAverage, limitBetween} from "../util/math-functions.js";

export default class HSL {
    // Source:
    // www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/
    static toRGB(h, s, l) {
        h /= 360;

        if (s === 0) {
            const r = l;
            const g = l;
            const b = l;
            return {r, g, b};
        }
        let temp1;
        if (l < 0.5) {
            temp1 = l * (1 + s);
        } else {
            temp1 = l + s - l * s;
        }
        let temp2 = 2 * l - temp1;

        let tempR = h + 0.333;
        if (tempR < 0) tempR += 1;
        if (tempR > 1) tempR -= 1;
        let tempG = h;
        if (tempG < 0) tempG += 1;
        if (tempG > 1) tempG -= 1;
        let tempB = h - 0.333;
        if (tempB < 0) tempB += 1;
        if (tempB > 1) tempB -= 1;

        let r = this.#rgbTests(temp1, temp2, tempR);
        let g = this.#rgbTests(temp1, temp2, tempG);
        let b = this.#rgbTests(temp1, temp2, tempB);

        r = limitBetween(r, 0, 1);
        g = limitBetween(g, 0, 1);
        b = limitBetween(b, 0, 1);

        return {r, g, b};
    }

    static fromRGB(r, g, b) {
        const minRGB = Math.min(r, g, b);
        const maxRGB = Math.max(r, g, b);

        // Lightness
        const l = (maxRGB + minRGB) / 2;

        // Saturation
        let s;
        if (minRGB === maxRGB) {
            s = 0;
        } else {
            if (l <= 0.5) {
                s = (maxRGB - minRGB) / (maxRGB + minRGB);
            } else {
                s = (maxRGB - minRGB) / (2 - maxRGB - minRGB);
            }
        }

        // Hue
        let h = 0;
        if (maxRGB !== minRGB) {
            switch (maxRGB) {
                case r:
                    h = (g - b) / (maxRGB - minRGB);
                    break;
                case g:
                    h = 2 + (b - r) / (maxRGB - minRGB);
                    break;
                case b:
                    h = 4 + (r - g) / (maxRGB - minRGB);
                    break;
            }
        }
        h = Math.round(h * 60)
        if (h < 0) h += 360;
        return {h, s, l};
    }

    static #rgbTests(temp1, temp2, tempColor) {
        if (6 * tempColor < 1) return temp2 + (temp1 - temp2) * 6 * tempColor;
        if (2 * tempColor < 1) return temp1;
        if (3 * tempColor < 2) return temp2 + (temp1 - temp2) * (0.666 - tempColor) * 6;
        return temp2;
    }

    static mix(r1, g1, b1, r2, g2, b2) {
        let hsl1 = HSL.fromRGB(r1, g1, b1);
        let hsl2 = HSL.fromRGB(r2, g2, b2);

        let hDifference = Math.abs(hsl1.h - hsl2.h);
        let mixedH;
        if (hDifference > 180) {
            mixedH = getAverage(hsl1.h + 360, hsl2.h) % 360;
        } else {
            mixedH = getAverage(hsl1.h, hsl2.h);
        }

        let mixedS = getAverage(hsl1.s, hsl2.s);
        let mixedL = getAverage(hsl1.l, hsl2.l);
        return HSL.toRGB(mixedH, mixedS, mixedL);
    }
}