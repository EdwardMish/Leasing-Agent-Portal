const multiply = function (a: number, b: number) {
    const commonMultiplier = Math.pow(10, 6);

    a *= commonMultiplier;
    b *= commonMultiplier;

    return (a * b) / (commonMultiplier * commonMultiplier);
};

export default multiply;
