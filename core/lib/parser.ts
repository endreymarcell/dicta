import { match, MatchResult } from "./matcher";
import {
    commandsWithPayload,
    keywords,
    motionsWithPayload,
    symbols,
    targetedCommandsWithPayload,
    vimPattern
} from "./vim";

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

function addControlChars(match: Exclude<MatchResult, undefined>): Exclude<MatchResult, undefined> {
    if (match && match.length >= 2 && match[match.length - 1].name === 'tail') {
        const mainUnit = match.find(unit => unit.name === 'command' || unit.name === 'motion')
        if (mainUnit === undefined) {
            return match;
        }
        if ([...commandsWithPayload, ...targetedCommandsWithPayload].includes(mainUnit.value)) {
            return [...match, { name: 'control', value: '<c:escape>' }]
        } else if ([...motionsWithPayload].includes(mainUnit.value)) {
            return [...match, { name: 'control', value: '<c:enter>'}]
        } else {
            return match;
        }
    } else {
        return match;
    }
}

export function parse(input: string): string {
    const result = match(input, vimPattern);
    if (result === undefined) {
        throw new Error("Pattern matching failed");
    } else {
        const withControlChars = addControlChars(result);
        return withControlChars.map(unit => {
            if (unit.name === 'tail') {
                return replaceSymbols(unit.value);
            } else {
                if (unit.name === 'control') {
                    return unit.value;
                } else if (keywords.has(unit.value)) {
                    return keywords.get(unit.value);
                } else {
                    throw new Error(`Parsing failed: unknown key: ${unit.value}`)
                }
            }
        }).join('');
    }
}
