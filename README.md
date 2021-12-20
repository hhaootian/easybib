# <img src="https://github.com/htian97/autobib/blob/main/icons/icon.png" width="150">  
[![Test Actions Status](https://github.com/platinumjesus/vscode-advanced-search-extension/workflows/Test/badge.svg)](https://github.com/platinumjesus/vscode-advanced-search-extension/actions)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

Make <img src="https://render.githubusercontent.com/render/math?math=\LaTeX"> bib easier.

## Features

- Trigger web search on Google Scholar.
- Auto paste BibTeX to local bib file.

## Commands

- Search on Google Scholar
  - View Command Palette (<kbd>⇧ Shift</kbd>+<kbd>⌘ Command</kbd>+<kbd>P</kbd>), type & select `autobib: search`
  - Or use hotkey <kbd>⇧ Shift</kbd>+<kbd>⌘ Command</kbd>+<kbd>G</kbd>
- Paste to bib file
  - View Command Palette (<kbd>⇧ Shift</kbd>+<kbd>⌘ Command</kbd>+<kbd>P</kbd>), type & select `autobib: clip`
  - Or use hotkey <kbd>⇧ Shift</kbd>+<kbd>⌘ Command</kbd>+<kbd>C</kbd>

## Usage

1. Search: in the popup input box, type title / author / keywords, just as using Google Scholar. Once entered, you will be redirected to the webpage.
2. Copy: Choose the paper you want, click <kbd>\" Cite</kbd> - <kbd>BibTeX</kbd>.

## Known Issues

- Local bib file has to be named as `ref.bib` which is currently hardcoded in scripts.
