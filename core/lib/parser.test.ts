import { parse, replaceSymbols, turnIntoVimCommand } from "./parser"

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

    describe('turnIntoVimCommand', () => {
        test('motion', () => {
            expect(turnIntoVimCommand('down')).toBe('j');
        })

        test('count + motion', () => {
            expect(turnIntoVimCommand('three times up')).toBe('3k')
        })

        test('multi-word paramless command', () => {
            expect(turnIntoVimCommand('paste below')).toBe('p');
        })

        test('command with params', () => {
            expect(turnIntoVimCommand('delete inside (')).toBe('di(');
        })
    })

    describe('full parsing', () => {
        test('full parsing', () => {
            expect(parse('delete inside curly braces')).toBe('di}');
        })
    })
})
