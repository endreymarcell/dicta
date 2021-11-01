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
    ovid: 'forward',
    colin: 'colon',
    calendar: 'colon',
    surrounds: 'surround',
    maine: 'name',
    ford: 'word',
    vard: 'word',
    button: 'bottom',
    vert: 'word',
    attend: 'append',
    verge: 'word',
    coat: 'quote',
    coats: 'quotes',
    backpacks: 'backticks',
    chain: 'change',
    dialed: 'down',
    world: 'word',
}));

function replaceFixes(input: string): string {
    return input.split(' ').map(part => fixes.get(part) ?? part).join(' ');
}

export function correct(input: string): string {
    return replaceFixes(input.trim().toLowerCase())
        .replace('back takes', 'backticks')
        .replace('the band', 'append')
        .replace("it's around", 'surround')
        .replace('the word', 'word')
        .replace('change of guard', 'change word')
        .replace("you're", "")
        .replace("I'm due", "undo")

}
