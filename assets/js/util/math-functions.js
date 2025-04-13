export function getAverage(value1, value2) {
    let total = parseFloat(value1) + parseFloat(value2);
    return (total / 2);
}

export function limitBetween(value, min, max) {
    value = Math.max(value, min);
    value = Math.min(value, max);
    return value;
}

export function randomFromArray(array) {
    return array[randomInt(array.length - 1)];
}

export function randomInt(max) {
    return Math.round(Math.random() * max);
}

export function randomIntBetween(min, max) {
    return randomInt(max - min) + min;
}

export function weightedRandom(middle, deviation) {
    return middle + (Math.log(1 - Math.random()) / -deviation) * (Math.random() < 0.5 ? -1 : 1)
}