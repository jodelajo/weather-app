function metricToBeaufort (ms) {
    return Math.ceil(Math.cbrt(Math.pow(ms/0.836, 2)));
}
export default metricToBeaufort