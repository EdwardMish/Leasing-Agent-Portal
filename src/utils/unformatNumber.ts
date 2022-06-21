const unformatNumber = (formattedNumber: string = ''): number =>
    Number(parseFloat(formattedNumber.replace(/[^0-9.]/g, '')).toFixed(2));
export default unformatNumber;
