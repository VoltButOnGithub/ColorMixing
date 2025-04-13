import {getAverage} from "../util/math-functions.js";

export default class RGB {
    static mix(r1, g1, b1, r2, g2, b2) {
        let mixedR = getAverage(r1, r2);
        let mixedG = getAverage(g1, g2);
        let mixedB = getAverage(b1, b2);
        return {r: mixedR, g: mixedG, b: mixedB};
    }
}

