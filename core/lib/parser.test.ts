import { parse, replaceSymbols } from "./parser"

describe('parser', () => {
    describe('replaceSymbols', () => {
        test('no symbols', () => {
            expect(replaceSymbols('foo bar baz')).toBe('foobarbaz');
        })

        test('single-word symbol', () => {
            expect(replaceSymbols('foo space equals space one semicolon')).toBe('foo = 1;')
        })

        test('multiple-word symbols', () => {
            expect(replaceSymbols('foo opening parenthesis single quote bar single quote closing parenthesis semicolon')).toBe("foo('bar');");
        })
    });

    describe('full parsing', () => {
        test('simple motion', () => {
            expect(parse('down')).toBe('j');
        })
        test('motion with payload', () => {
            expect(parse('go to function')).toBe('/function<c:enter>')
        })
        test('count (spelled out) + simple motion', () => {
            expect(parse('three up')).toBe('3k')
        })
        test('count (with number) + motion', () => {
            expect(parse('3 down')).toBe('3j')
        })
        test('multi-word paramless command', () => {
            expect(parse('paste below')).toBe('p');
        })
        test('targeted command (motion)', () => {
            expect(parse('yank forward')).toBe('yw');
        })
        test('targeted command (motion with count)', () => {
            expect(parse('delete two down')).toBe('d2j')
        })
        test('targeted command (text object)', () => {
            expect(parse('delete inside double quotes')).toBe('di"');
            expect(parse('yank inside curly braces')).toBe('yi}');
        })
        test('command with payload, no symbols', () => {
            expect(parse('insert I space like space trains')).toBe('iI like trains<c:escape>');
        })
        test('command with payload, symbols', () => {
            expect(parse('insert alert opening parenthesis single quote hello space world single quote closing parenthesis semicolon'))
                .toBe("ialert('hello world');<c:escape>");
        })
        test('targeted command with payload (motion)', () => {
            expect(parse('change end whatever')).toBe('c$whatever<c:escape>');
        })
        test('targeted command with payload (motion with count)', () => {
            expect(parse('change two words hello space world')).toBe('c2whello world<c:escape>')
        })
        test('targeted command with payload (text object)', () => {
            expect(parse('change inside double quotes hello space world')).toBe('ci"hello world<c:escape>')
        })
    })
})
