import LRGB from "./lrgb.js";
import {getAverage, limitBetween} from "../util/math-functions.js";

export default class XYZ {
    static toRGB(x, y, z) {
        let r = x * 3.2409699419045226 + y * -1.5373831775700939 + z * -0.4986107602930034;
        let g = x * -0.9692436362808796 + y * 1.8759675015077204 + z * 0.0415550574071756;
        let b = x * 0.0556300796969936 + y * -0.2039769588889765 + z * 1.0569715142428784;

        r = limitBetween(r, 0, 1);
        g = limitBetween(g, 0, 1);
        b = limitBetween(b, 0, 1);
        return LRGB.toRGB(r, g, b);
    }

    static fromRGB(r, g, b) {
        let x = r * 0.4124 + g * 0.3576 + b * 0.1805;
        let y = r * 0.2126 + g * 0.7152 + b * 0.0722;
        let z = r * 0.0193 + g * 0.1192 + b * 0.9505;

        return {x, y, z};
    }

    static mix(r1, g1, b1, r2, g2, b2) {
        let xyz1 = XYZ.fromRGB(r1, g1, b1);
        let xyz2 = XYZ.fromRGB(r2, g2, b2);
        let mixedX = getAverage(xyz1.x, xyz2.x);
        let mixedY = getAverage(xyz1.y, xyz2.y);
        let mixedZ = getAverage(xyz1.z, xyz2.z);
        return XYZ.toRGB(mixedX, mixedY, mixedZ);
    }
}