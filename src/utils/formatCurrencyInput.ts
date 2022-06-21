export const formatCurrencyInput = (input: string): number => {
    let output: number = 0;

    const [d, c] = input.split('.');

    const dollars: string = d.trim().replace(/\D/g, '');

    if (!c) {
        output = parseInt(dollars) * 100;
    } else {
        const cents = c.trim().replace(/\D/g, '');

        if (cents.length === 1) {
            output = parseInt(`${dollars}${cents}0`);
        }

        if (cents.length === 2) {
            output = parseInt(`${dollars}${cents}`);
        }
    }

    return typeof output === 'number' ? output : 0;
};
