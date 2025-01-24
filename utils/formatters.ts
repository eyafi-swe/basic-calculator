import Decimal from "decimal.js";

export const formatNumberToLocaleString = (value: Decimal) => {
    if (value.isNaN()) return 'Error';
    let resultNumber = value.toNumber();
    if (resultNumber !== 0 && (Math.abs(resultNumber) >= 1e15 || Math.abs(resultNumber) < 1e-6)) {
        return value.toExponential(3);
    }
    return resultNumber?.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 }) ?? '';
};