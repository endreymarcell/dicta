type PatternUnit = { name: string, values: string[], isIgnored?: boolean } | { name: 'tail', values: [] };
export type Pattern = PatternUnit[];

type MatchUnit = { name: string, value: string }
type MatchTail = { name: 'tail', value: string }
export type MatchResult = MatchUnit[] | [...MatchUnit[], MatchTail] | undefined;

export function matchPattern(text: string, pattern: Pattern): MatchResult {
    if (pattern.length === 0) {
        return [];
    }

    if (pattern.length === 1 && pattern[0].name === 'tail') {
        return [{ name: 'tail', value: text }]
    }

    let matchingUnit;
    const unit = pattern[0];
    for (const possibleValue of unit.values) {
        if (text.startsWith(possibleValue)) {
            matchingUnit = { name: unit.name, value: possibleValue };
            break;
        }
    }

    if (matchingUnit === undefined) {
        return undefined;
    } else {
        const tail = matchPattern(text.slice(matchingUnit.value.length).trim(), pattern.slice(1));
        if (tail === undefined) {
            return undefined;
        } else {
            return [matchingUnit, ...tail];
        }
    }
}
