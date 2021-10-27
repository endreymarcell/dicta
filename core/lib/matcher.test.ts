import { matchSinglePattern, match, Pattern, PatternShorthand, doesStartWithWord } from "./matcher";

describe('matcher', () => {
    describe('helpers', () => {
        describe('doesStartWithWord', () => {
            test('does not start with word', () => {
                expect(doesStartWithWord('foo', 'bar')).toBe(false);
            })
            test('same word', () => {
                expect(doesStartWithWord('foo', 'foo')).toBe(true);
            })
            test('starts with word', () => {
                expect(doesStartWithWord('foo and bar', 'foo')).toBe(true);
            })
            test('same prefix but not entire word', () => {
                expect(doesStartWithWord('foobar', 'foo')).toBe(false);
            })
        })
    })
    describe('matchPattern', () => {
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
            const result = matchSinglePattern(input, pattern);
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
            const result = matchSinglePattern(input, pattern);
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
            const result = matchSinglePattern(input, pattern);
            expect(result).toEqual(expected);
        })

        test('no match', () => {
            const input = 'no joy';
            const pattern: Pattern = [
                { name: 'amount', values: ['no', 'some'] },
                { name: 'object', values: ['cigar', 'luck'] },
            ];
            const result = matchSinglePattern(input, pattern);
            expect(result).toBeUndefined();
        })

        test('vim-style example', () => {
            const input = 'change inside single quotes my text comes here';
            let pattern: Pattern = [
                { name: 'command', values: ['change', 'surround'] },
                { name: 'text object prefix', values: ['in', 'inside', 'around'] },
                { name: 'text object target', values: ['single quotes', 'word', 'parentheses'] },
                { name: 'tail', values: [] },
            ];
            pattern = [
                { name: 'command', values: ['change', 'surround'] },
                { name: 'text object prefix', values: ['in', 'inside', 'around'] },
                {
                    name: 'text object target',
                    values: ['word', 'single quotes', 'double quotes', 'parentheses']
                },
                { name: 'tail', values: [] }
            ]

            const expected = [
                { name: 'command', value: 'change' },
                { name: 'text object prefix', value: 'inside' },
                { name: 'text object target', value: 'single quotes' },
                { name: 'tail', value: 'my text comes here' },
            ]
            const result = matchSinglePattern(input, pattern);
            expect(result).toEqual(expected);
        })
    })

    describe('match', () => {
        test('single matching pattern', () => {
            const input = 'my spoon is too big';
            const patterns: PatternShorthand[] = [
                [
                    'my',
                    ['object', ['spoon', 'head', 'bicycle']],
                    'is',
                    '__tail'
                ],
            ];
            const result = match(input, patterns);
            const expected = [
                { name: 'my', value: 'my' },
                { name: 'object', value: 'spoon' },
                { name: 'is', value: 'is' },
                { name: 'tail', value: 'too big' }
            ];
            expect(result).toEqual(expected);
        })

        test('vim-style example', () => {
            const input = 'change inside single quotes my text comes here';
            const patterns: PatternShorthand[] = [
                [
                    ['command', ['paste above', 'paste below']]
                ],
                [
                    ['command', ['delete', 'yank']],
                    ['motion', ['word', 'home', 'end']],
                ],
                [
                    ['command', ['delete', 'yank']],
                    ['text object prefix', ['in', 'around']],
                    ['text object target', ['word', 'single quotes', 'double quotes', 'parentheses']],
                ],
                [
                    ['command', ['change', 'surround']],
                    ['text object prefix', ['in', 'inside', 'around']],
                    ['text object target', ['word', 'single quotes', 'double quotes', 'parentheses']],
                    '__tail',
                ]
            ]
            const result = match(input, patterns);
            const expected = [
                { name: 'command', value: 'change' },
                { name: 'text object prefix', value: 'inside' },
                { name: 'text object target', value: 'single quotes' },
                { name: 'tail', value: 'my text comes here' },
            ]
            expect(result).toEqual(expected);
        })
    })
})
