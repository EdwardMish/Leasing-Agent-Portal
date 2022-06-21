export const dateIsInRange = (lowerDateRange: Date, upperRangeComparator: Date = new Date()): boolean => {
    const fiveYearsAgo: Date = new Date(new Date().setFullYear(new Date().getFullYear() - 5));

    if (lowerDateRange.getFullYear() < fiveYearsAgo.getFullYear()) return false;

    const lowerYear: number = lowerDateRange.getFullYear();
    const upperYear: number = upperRangeComparator.getFullYear();

    if (lowerYear > upperYear) return false;

    if (lowerYear === upperYear && lowerDateRange.getMonth() > upperRangeComparator.getMonth()) return false;

    return true;
};
