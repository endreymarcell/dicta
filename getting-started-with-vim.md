# Getting started with vim

## Starting set

vim tutorials and cheat sheets overwhelm first-time users with too many commands. Here's a minimal starter set you should learn first:

### Motions
- arrow key replacements: `j`, `k`, `h`, `l`
- moving by words: `w` and `W`, `b`, and `B`
- line start/end: `^` and `$`
- by search: `/` and `?` (plus enter to select hit)
- entire document: `gg` and `G`

### Operations
- `a` to add text (esc to go back to normal mode)
- `d*` to delete (replace * with motion or text object)
- `c*` to change (change = delete + add in a single operation)
- `y*` to yank (=copy)
- `p` to paste

### Text objects
- `i`: inside
    - `iw`, `iW`, `i'`, `i(`, `i<`...
- `a`: around
    - `aw`, `aW`, `a'`, `a(`, `a<`...
- `_`: entire line

### Command history
- `.` to repeat the last command
- `u` to undo
- `Ctrl+R` to redo

### Examples
- Delete a word backwards (alphanumeric only): `db`
- Change the word inside the quotes to foo: `ci"foo<esc>`
- Yank (copy) the current line: `y_`
- Delete until the next , character: `d/,<enter>`
- Change the word under the cursor (including punctuation) to something: `ciWsomething<esc>`

## Plugins for your editor
- VS Code
    - vscodevim
    - vscode-neovim
- JetBrains IDE family
    - IdeaVim
- Tutorials
    - vimtutor is installed with vim
    - vim-adventures.com

## My recommendations
- For exiting single text files, use vim. For editing projects, use your favorite editor/IDE with a vim plugin.
- Use gvim or MacVim rather than the command-line vim for a nicer app experience.
- To learn vim, enable the vim plugin in the morning and stick with it until you're fed up, then disable it. Repeat this process the next day, and keep repeating it until you're comfortable.
- Install the vim-surround plugin
- See also my .vimrc
