import { coordinateDistance, checkInsideRadius, checkMultiInsideRadius, checkSingleRadiusWithMulti } from 'earth-coordinate-distance';

const option_one = {
    unit: 'meter',
    overrideEarthRadius: null
}

export const hitungJarak = (titik) => {
    coordinateDistance(titik, option_one);
}