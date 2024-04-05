/**
 * Function to convert a timestamp to human readable format
 * 
 * @param {Number} timestamp The timestamp to convert.
 * @returns {String} The human readable timestamp.
 * 
 * @example
 * // Returns "Today at 12:00 PM"
 * timestamps("2024-01-01T12:00:00Z");
 */
export default function timestamps(timestamp) {
    const date = new Date(Date.parse(timestamp));
    const now = new Date();

    const isToday = date.toDateString() === now.toDateString();
    const isYesterday = date.toDateString() === new Date(now - 86400000).toDateString();
    const isThisYear = date.getFullYear() === now.getFullYear();

    switch (true) {
        case isToday:
            return `Today at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
        case isYesterday:
            return `Yesterday at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
        case isThisYear:
            return `${date.toLocaleDateString([], { month: "short", day: "numeric" })} at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
        default:
            return `${date.toLocaleDateString([], { year: "numeric", month: "short", day: "numeric" })} at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    }
}