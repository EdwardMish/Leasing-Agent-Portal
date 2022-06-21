export const formatCurrency = (amount: number, multiplier: number = 0.01, withCents: boolean = true) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumSignificantDigits: withCents ? undefined : Math.abs(amount).toFixed().length,
    }).format(amount * multiplier);
