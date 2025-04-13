import LRGB from "./lrgb.js";
import {getAverage, limitBetween} from "../util/math-functions.js";

export default class Oklab {
    static toRGB(l, a, b) {
        let L = Math.pow(
            l * 0.99999999845051981432 +
            0.39633779217376785678 * a +
            0.21580375806075880339 * b,
            3
        );
        let m = Math.pow(
            l * 1.0000000088817607767 -
            0.1055613423236563494 * a -
            0.063854174771705903402 * b,
            3
        );
        let s = Math.pow(
            l * 1.0000000546724109177 -
            0.089484182094965759684 * a -
            1.2914855378640917399 * b,
            3
        );
        let r = +4.076741661347994 * L - 3.307711590408193 * m + 0.230969928729428 * s;
        let g = -1.2684380040921763 * L + 2.6097574006633715 * m - 0.3413193963102197 * s;
        let B = -0.004196086541837188 * L - 0.7034186144594493 * m + 1.7076147009309444 * s;

        r = limitBetween(r, 0, 1);
        g = limitBetween(g, 0, 1);
        B = limitBetween(B, 0, 1);

        return LRGB.toRGB(r, g, B);
    }

    static fromRGB(r, g, b) {
        let lRGB = LRGB.fromRGB(r, g, b);

        let L = Math.cbrt(
            0.41222147079999993 * lRGB.r + 0.5363325363 * lRGB.g + 0.0514459929 * lRGB.b
        );
        let M = Math.cbrt(
            0.2119034981999999 * lRGB.r + 0.6806995450999999 * lRGB.g + 0.1073969566 * lRGB.b
        );
        let S = Math.cbrt(
            0.08830246189999998 * lRGB.r + 0.2817188376 * lRGB.g + 0.6299787005000002 * lRGB.b
        );

        let l = 0.2104542553 * L + 0.793617785 * M - 0.0040720468 * S;
        let a = 1.9779984951 * L - 2.428592205 * M + 0.4505937099 * S;
        let B = 0.0259040371 * L + 0.7827717662 * M - 0.808675766 * S;

        return {l, a, b: B}
    }

    static mix(r1, g1, b1, r2, g2, b2) {
        let oklab1 = Oklab.fromRGB(r1, g1, b1);
        let oklab2 = Oklab.fromRGB(r2, g2, b2);
        let mixedL = getAverage(oklab1.l, oklab2.l);
        let mixedA = getAverage(oklab1.a, oklab2.a);
        let mixedB = getAverage(oklab1.b, oklab2.b);
        return Oklab.toRGB(mixedL, mixedA, mixedB);
    }
}