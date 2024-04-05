/**
 * Converts a cardinal number to an ordinal number.
 * @param {number} number The cardinal number to convert.
 * 
 * @returns {string} The ordinal number.
 * 
 * @example
 * // Returns "1st"
 * cardinalToOrdinal(1);
 */
export default function cardinalToOrdinal(number) {
    const j = number % 10, k = number % 100;
    if (j == 1 && k != 11) return "st";
    if (j == 2 && k != 12) return "nd";
    if (j == 3 && k != 13) return "rd";
    return "th";
}