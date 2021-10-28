type PatternUnit = { name: string, values: string[], isIgnored?: boolean };
type PatternTail = { name: 'tail', values: [] };
export type Pattern = PatternUnit[] | [...PatternUnit[], PatternTail];

type MatchUnit = { name: string, value: string }
type MatchTail = { name: 'tail', value: string }
export type MatchResult = MatchUnit[] | [...MatchUnit[], MatchTail] | undefined;

export function doesStartWithWord(text: string, word: string): boolean {
    return text.startsWith(word) && (text.length === word.length || text[word.length] === ' ');
}

export function matchSinglePattern(text: string, pattern: Pattern): MatchResult {
    if (pattern.length === 0) {
        return [];
    }

    if (pattern.length === 1 && pattern[0].name === 'tail') {
        return [{ name: 'tail', value: text }]
    }

    let matchingUnit;
    const unit = pattern[0];
    for (const possibleValue of unit.values) {
        if (doesStartWithWord(text, possibleValue)) {
            matchingUnit = { name: unit.name, value: possibleValue };
            break;
        }
    }

    if (matchingUnit === undefined) {
        return undefined;
    } else {
        const tail = matchSinglePattern(text.slice(matchingUnit.value.length).trim(), pattern.slice(1));
        if (tail === undefined) {
            return undefined;
        } else {
            return [matchingUnit, ...tail];
        }
    }
}

export function matchMultiplePatterns(text: string, patterns: Pattern[]): MatchResult {
    for (const pattern of patterns) {
        const matchResult = matchSinglePattern(text, pattern);
        if (matchResult !== undefined) {
            return matchResult;
        }
    }

    return undefined;
}

export type PatternUnitShorthand = [name: string, values: string[]] | '__tail' | string;
export type PatternShorthand = PatternUnitShorthand[] | [...PatternUnitShorthand[], '__tail'];

function expandShorthand(shorthand: PatternShorthand): Pattern {
    return shorthand.map(unit => {
        if (typeof unit === 'string') {
            if (unit === '__tail') {
                return { name: 'tail', values: [] };
            } else {
                return { name: unit, values: [unit] }
            }
        } else {
            const [name, values] = unit;
            return { name, values };
        }
    })
}

export function match(text: string, patterns: PatternShorthand[]): MatchResult {
    return matchMultiplePatterns(text, patterns.map(pattern => expandShorthand(pattern)))
}
