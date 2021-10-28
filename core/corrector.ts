const fixes = new Map<string, string>(Object.entries({
    pace: 'paste',
    pasted: 'paste',
    piece: 'paste',
    peace: 'paste',
    pillow: 'below',
}));

function replaceFixes(input: string): string {
    let fixed = input;
    for (const [bad, good] of fixes) {
        fixed = fixed.replace(bad, good);
    }
    return fixed;
}

export function correct(input: string): string {
    return replaceFixes(input.trim().toLowerCase());
}
