import ColorView from "./color-view.js";
import HSL from "../colorspace/hsl.js";
import {TEXTURE} from "./texture.js";
import ColorModel from "./color-model.js";
import {randomFromArray, randomInt, randomIntBetween, weightedRandom} from "../util/math-functions.js";

export default class RandomColor {
    static createRandomColor() {
        let randomHue = randomInt(360);
        let randomSaturation = weightedRandom(0.8, 10);
        let randomLightness = weightedRandom(0.7, 20);
        let randomRGB = HSL.toRGB(randomHue, randomSaturation, randomLightness);
        let randomTexture = randomFromArray(Object.values(TEXTURE));
        let randomMixingSpeed = 5;
        let randomMixingTime = randomIntBetween(1, 10000);
        let randomColor = new ColorModel(randomRGB.r, randomRGB.g, randomRGB.b, randomMixingSpeed, randomMixingTime, randomTexture);
        return new ColorView(randomColor);
    }
}

