const numbers = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6'
}

const symbols = new Map<string, string>(Object.entries({
    ...numbers,
    'space': ' ',
    'single quote': "'",
    'single quotes': "'",
    'double quote': '"',
    'double quotes': '"',
    'parenthesis': '(',
    'opening parenthesis': '(',
    'closing parenthesis': ')',
    'parentheses': ')',
    'curly braces': '}',
    'opening curly': '{',
    'closing curly': '}',
    'brackets': ']',
    'opening bracket': '[',
    'closing bracket': ']',
    'period': '.',
    'dot': '.',
    'comma': ',',
    'question mark': '?',
    'dash': '-',
    'underscore': '_',
    'slash': '/',
    'semicolon': ';',
    'equals': '=',
    'double equals': '==',
    'triple equals': '===',
}));

type Keyword = string | { char: string, doesExpectInput?: boolean };
const keywords = new Map<string, Keyword>(Object.entries({
    // Counts
    ...numbers,
    twice: '2',
    times: '',
    lines: '',
    characters: '',

    // Motions
    go: '',
    up: 'k',
    down: 'j',
    left: 'l',
    right: 'r',
    home: '^',
    'to line start': '^',
    'to the start of the line': '^',
    end: '$',
    'to line end': '$',
    'to the end of the line': '$',
    top: 'gg',
    'to the top': 'gg',
    'to the top of the document': 'gg',
    bottom: 'G',
    'to the bottom': 'G',
    'to the bottom of the document': 'G',

    // Text objects
    inside: 'i',
    in: 'i',
    around: 'a',
    surrounding: 's',
    word: 'w',

    insert: { char: 'i', doesExpectInput: true },
    append: { char: 'a', doesExpectInput: true },
    delete: 'd',
    'paste above': 'P',
    'paste below': 'p',
    yank: 'y',
    change: { char: 'c', doesExpectInput: true },
    surround: { char: 'ys', doesExpectInput: true },
}))

export function replaceSymbols(input: string): string {
    if (input === '') {
        return '';
    }

    let originalSymbol: string = '';
    for (const original of symbols.keys()) {
        if (input.startsWith(original)) {
            originalSymbol = original;
            break;
        }
    }
    if (originalSymbol !== '') {
        return symbols.get(originalSymbol) + replaceSymbols(input.slice(originalSymbol.length));
    } else {
        if (input.includes(' ')) {
            return input.slice(0, input.indexOf(' ')) + replaceSymbols(input.slice(input.indexOf(' ') + 1));
        } else {
            return input;
        }
    }
}

export function turnIntoVimCommand(input: string): string {
    if (input === '') {
        return '';
    }

    let originalKeyword: string = '';
    for (const keyword of keywords.keys()) {
        if (input.startsWith(keyword)) {
            originalKeyword = keyword;
            break;
        }
    }

    if (originalKeyword !== '') {
        const command = keywords.get(originalKeyword);
        if (typeof command !== 'string' && command?.doesExpectInput) {
            return command.char + input.slice(originalKeyword.length)
        } else {
            return command + turnIntoVimCommand(input.slice(originalKeyword.length));
        }
    } else {
        if (input.includes(' ')) {
            return input.slice(0, input.indexOf(' ')) + turnIntoVimCommand(input.slice(input.indexOf(' ') + 1));
        } else {
            return input;
        }
    }
}

export function parse(input: string) {
    const inputWithSymbols = replaceSymbols(input);
    const asVimCommand = turnIntoVimCommand(inputWithSymbols);
    return asVimCommand;
}
