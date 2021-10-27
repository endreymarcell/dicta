import { matchPattern, Pattern } from "./matcher";

describe('matcher', () => {
    test('single-word units', () => {
        const input = 'eat the sandwich';
        const pattern: Pattern = [
            { name: 'verb', values: ['eat', 'drink', 'buy'] },
            { name: 'the', values: ['the'] },
            { name: 'object', values: ['sandwich', 'beer', 'chicken'] }
        ]
        const expected = [
            { name: 'verb', value: 'eat' },
            { name: 'the', value: 'the' },
            { name: 'object', value: 'sandwich' },
        ]
        const result = matchPattern(input, pattern);
        expect(result).toEqual(expected);
    })

    test('multi-word units', () => {
        const input = 'stand up and run away';
        const pattern: Pattern = [
            { name: 'first action', values: ['stand up', 'sit down'] },
            { name: 'and', values: ['and'] },
            { name: 'second action', values: ['run away', 'fall asleep'] }
        ]
        const expected = [
            { name: 'first action', value: 'stand up' },
            { name: 'and', value: 'and' },
            { name: 'second action', value: 'run away' },
        ]
        const result = matchPattern(input, pattern);
        expect(result).toEqual(expected);
    })

    test('tail parameter', () => {
        const input = 'my fav food is spaghetti with meatballs';
        const pattern: Pattern = [
            { name: 'my fav', values: ['my fav'] },
            { name: 'object', values: ['food', 'sport', 'animal'] },
            { name: 'is', values: ['is'] },
            { name: 'tail', values: [] },
        ]
        const expected = [
            { name: 'my fav', value: 'my fav' },
            { name: 'object', value: 'food' },
            { name: 'is', value: 'is' },
            { name: 'tail', value: 'spaghetti with meatballs' },
        ];
        const result = matchPattern(input, pattern);
        expect(result).toEqual(expected);
    })

    test('no match', () => {
        const input = 'no joy';
        const pattern: Pattern = [
            { name: 'amount', values: ['no', 'some'] },
            { name: 'object', values: ['cigar', 'luck'] },
        ];
        const result = matchPattern(input, pattern);
        expect(result).toBeUndefined();
    })
})
