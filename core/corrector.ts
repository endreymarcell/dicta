const fixes = new Map<string, string>(Object.entries({
    pace: 'paste',
    pasted: 'paste',
    piece: 'paste',
    peace: 'paste',
    pillow: 'below',
    app: 'up',
    free: 'three',
    bird: 'word',
    verte: 'word',
    talk: 'top',
    cope: 'top',
    stop: 'top',
}));

function replaceFixes(input: string): string {
    return input.split(' ').map(part => fixes.get(part) ?? part).join(' ');
}

export function correct(input: string): string {
    return replaceFixes(input.trim().toLowerCase());
}
