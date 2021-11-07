# Getting started with vim

## Starting set

vim tutorials and cheat sheets overwhelm first-time users with too many commands. Here's a minimal starter set you should learn first:

### Motions
- arrow key replacements: `j`, `k`, `h`, `l`
- moving forward/backward by words: `w` and `W`, `b`, and `B` (lowercase = alphanumeric only, uppercase = everything but whitespace)
- line start/end: `^` and `$`
- by search (forward/backward): `/` and `?` (plus `enter` to select hit)
- entire document: `gg` and `G`

### Operations
- `a` to add text (`esc` to go back to normal mode)
- `d*` to delete (replace `*` with motion or text object)
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
- Delete until the next `,` character: `d/,<enter>`
- Change the word under the cursor (including punctuation) to `something`: `ciWsomething<esc>`

## Plugins for your editor
- VS Code
    - [vscodevim](https://aka.ms/vscodevim)
    - [vscode-neovim](https://github.com/asvetliakov/vscode-neovim)
- JetBrains IDE family
    - [IdeaVim](https://github.com/JetBrains/ideavim)
- Tutorials
    - [vimtutor](https://superuser.com/questions/246487/how-to-use-vimtutor) is installed with vim
    - [vim-adventures.com](https://vim-adventures.com) is an online game
    - [Mastering the Vim Language](https://youtu.be/wlR5gYd6um0) is a great talk by Chris Toomey to get you started

## My recommendations
- For editing single text files, use vim. For editing projects, use your favorite editor/IDE with a vim plugin.
- Use [gvim](https://askubuntu.com/questions/862531/what-is-the-difference-between-gvim-and-vim) or [MacVim](https://macvim-dev.github.io/macvim) rather than the command-line vim for a nicer app experience.
- To learn vim, enable the vim plugin in the morning and stick with it until you're fed up, then disable it. Repeat this process the next day, and keep repeating it until you're comfortable vim with for the entire day.
- Remap your Caps Lock key to Escape in vim for a much more ergonomic setup.
- Install the [vim-surround](https://github.com/tpope/vim-surround) plugin to get access to related text objects - this will enable you to do things like "change surrounding single quotes to double quotes" (`cs'"`)
- See also [my .vimrc](https://github.com/endreymarcell/dotfiles/blob/master/vim/.vimrc) for ideas
