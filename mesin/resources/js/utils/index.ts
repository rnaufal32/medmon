export const generateHoverColor = (
    hexColor: string,
    factor: number = 0.1
): string => {
    // Remove # if present
    hexColor = hexColor.replace(/^#/, "");

    // Convert hex to RGB
    let r = parseInt(hexColor.substring(0, 2), 16);
    let g = parseInt(hexColor.substring(2, 4), 16);
    let b = parseInt(hexColor.substring(4, 6), 16);

    // Increase lightness (factor = 0.1 means 10% lighter)
    r = Math.min(255, Math.round(r + (255 - r) * factor));
    g = Math.min(255, Math.round(g + (255 - g) * factor));
    b = Math.min(255, Math.round(b + (255 - b) * factor));

    // Convert back to hex
    const toHex = (c: number) => c.toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};
