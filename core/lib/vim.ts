import {PatternShorthand, PatternUnitShorthand} from "./matcher";

const numbers = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6'
}

const delimiters = {
  'single quote': "'",
  'single quotes': "'",
  'double quote': '"',
  'double quotes': '"',
  backticks: '`',
  'parenthesis': '(',
  'parentheses': ')',
  'opening parenthesis': '(',
  'closing parenthesis': ')',
  'curly braces': '}',
  'opening curly': '{',
  'closing curly': '}',
  'bracket': '[',
  'brackets': ']',
  'opening bracket': '[',
  'closing bracket': ']',
}

export const symbols = new Map<string, string>(Object.entries({
  ...numbers,
  ...delimiters,
  space: ' ',
  period: '.',
  dot: '.',
  comma: ',',
  'question mark': '?',
  dash: '-',
  underscore: '_',
  slash: '/',
  semicolon: ';',
  color: ':',
  equals: '=',
  'double equals': '==',
  'triple equals': '===',
  dollar: '$'
}));

// TODO
// 1. refactor so that I don't have to repeat the values for key synonyms
// 2. unify with the patterns somehow
type Keyword = string;
export const keywords = new Map<string, Keyword>(Object.entries({
  // Counts
  ...numbers,
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  twice: '2',
  times: '',
  lines: '',
  characters: '',

  // Motions
  go: '',
  up: 'k',
  down: 'j',
  left: 'h',
  right: 'l',
  forward: 'w',
  forwards: 'w',
  backward: 'b',
  backwards: 'b',
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
  find: '/',
  until: '/',
  'go to': '/',
  search: '/',
  'search for': '/',
  next: 'n',
  previous: 'N',

  // Text objects
  inside: 'i',
  in: 'i',
  around: 'a',
  surrounding: 's',
  word: 'w',
  words: 'w',
  'a word': 'w',
  line: '_',
  'a line': '_',

  // Specifiers
  ...delimiters,

  // Commands
  insert: 'i',
  append: 'a',
  add: 'a',
  delete: 'd',
  'paste above': 'P',
  'paste below': 'p',
  yank: 'y',
  change: 'c',
  surround: 'ys',
  'new line above': 'O',
  'new line below': 'o',

  // History
  undo: 'u',
  redo: '<c:r:control>',
  repeat: '.',
  again: '.',
}))

// keywords
const stepMotions = ['up', 'down', 'left', 'right']
const jumpMotions = ['word', 'words', 'backward', 'backwards', 'forward', 'forwards', 'home', 'end', 'top', 'bottom', 'next', 'previous', 'to the top', 'go to the top', 'go to the bottom', 'to the bottom', 'go to the beginning of the document', 'go to the end of the document']
export const motionsWithPayload = ['search', 'search for', 'go to', 'find']
const simpleMotions = [...stepMotions, ...jumpMotions]

const paramlessCommands = ['paste above', 'paste below']
const targetedCommands = ['yank', 'delete']
export const commandsWithPayload = ['insert', 'add', 'append', 'new line above', 'new line below']
export const targetedCommandsWithPayload = ['change', 'surround']

const simpleTextObjects = ['line']
const textObjectPrefixes = ['in', 'inside', 'around', 'surrounding']
const textObjectSpecifiers = ['parentheses', 'single quotes', 'double quotes', 'curly braces', 'brackets', 'word']

const historyCommands = ['undo', 'redo', 'repeat', 'again']

// patterns
const countPattern: PatternUnitShorthand = ['count', [...Object.keys(numbers), ...Object.values(numbers)]]
const simpleMotionsPattern: PatternUnitShorthand = ['motion', simpleMotions]
const motionsWithPayloadPattern: PatternUnitShorthand = ['motion', motionsWithPayload]
const simpleTextObjectsPattern: PatternUnitShorthand = ['target', simpleTextObjects]
const compoundTextObjectPattern: PatternUnitShorthand[] = [['prefix', textObjectPrefixes], ['specifier', textObjectSpecifiers]]
const paramlessCommandPattern: PatternUnitShorthand = ['command', paramlessCommands]
const targetedCommandPattern: PatternUnitShorthand = ['command', targetedCommands]
const commandsWithPayloadPattern: PatternUnitShorthand = ['command', commandsWithPayload]
const targetedCommandsWithPayloadPattern: PatternUnitShorthand = ['command', targetedCommandsWithPayload]
const tail = '__tail'
const historyCommandPattern: PatternUnitShorthand = ['command', historyCommands]

export const vimPattern: PatternShorthand[] = [
  [simpleMotionsPattern],
  [motionsWithPayloadPattern, tail],
  [countPattern, simpleMotionsPattern],
  [paramlessCommandPattern],
  [targetedCommandPattern, simpleMotionsPattern],
  [targetedCommandPattern, countPattern, simpleMotionsPattern],
  [targetedCommandPattern, simpleTextObjectsPattern],
  [targetedCommandPattern, ...compoundTextObjectPattern],
  [commandsWithPayloadPattern, tail],
  [targetedCommandsWithPayloadPattern, simpleMotionsPattern, tail],
  [targetedCommandsWithPayloadPattern, countPattern, simpleMotionsPattern, tail],
  [targetedCommandsWithPayloadPattern, simpleTextObjectsPattern, tail],
  [targetedCommandsWithPayloadPattern, ...compoundTextObjectPattern, tail],
  [historyCommandPattern],
  [countPattern, historyCommandPattern],
];
