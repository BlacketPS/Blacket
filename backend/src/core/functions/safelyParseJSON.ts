export function safelyParseJSON(json: string) {
    let parsed: any;

    try {
        parsed = JSON.parse(json);
    } catch {
        // womp womp 🤓
    }

    return parsed as any;
}
