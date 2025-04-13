import LRGB from "../colorspace/lrgb.js";
import Oklab from "../colorspace/oklab.js";
import RGB from "../colorspace/rgb.js";
import XYZ from "../colorspace/xyz.js";

export function textureFromString(textureString) {
    let textureResult;
    Object.entries(TEXTURE).forEach(([key, texture]) => {
        if (textureString === texture.value) {
            textureResult = texture;
        }
    });
    return textureResult;
}

export const TEXTURE = {
    SMOOTH: {
        value: 'smooth',
        name: 'Smooth (CIE XYZ)',
        setStyle(color) {
            color.element.style.background = `${color.hex}`;
            color.element.style.borderRadius = "5px";
        },
        mixFunction: XYZ.mix,
        cssInterpolationMethod: "xyz"
    },
    SLIMY: {
        value: 'slimy',
        name: 'Slimy (Oklab)',
        setStyle(color) {
            color.element.style.background = `radial-gradient(circle at center,
                    hsl(${color.h}, ${color.s * 100}%, ${color.l * 100}%) 50%,
                    hsl(${color.h + 60}, ${color.s * 100}%, ${color.l * 100}%)
                )`;
            color.element.style.borderRadius = "50px";
        },
        mixFunction: Oklab.mix,
        cssInterpolationMethod: "oklab"
    },
    GRAINY: {
        value: 'grainy',
        name: 'Grainy (linear light RGB)',
        setStyle(color) {
            color.element.style.background = `radial-gradient(circle at center,
                    hsl(${color.h}, ${color.s * 100}%, ${color.l * 100}%) 50%,
                    hsl(${color.h}, ${color.s * 100}%, ${color.l * 100 - 20}%)
                )`;
            color.element.style.borderRadius = "25px";
        },
        mixFunction: LRGB.mix,
        cssInterpolationMethod: "srgb-linear"
    },
    COARSE: {
        value: 'coarse',
        name: 'Coarse (RGB)',
        setStyle(color) {
            color.element.style.background = `radial-gradient(circle at center,
                    hsl(${color.h}, ${color.s * 100}%, ${color.l * 100}%) 50%,
                    hsl(${color.h}, ${color.s * 100}%, ${color.l * 100 - 40}%)
                )`;
            color.element.style.borderRadius = "1px";
        },
        mixFunction: RGB.mix,
        cssInterpolationMethod: "srgb"
    },
}