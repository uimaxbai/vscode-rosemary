# vscode-rosemary

A simple VSC extension for the programming language Rosemary, located [here](https://github.com/spartanproj/rosemary).

## Features

### Syntax highlighting

![Demo of syntax highlighting](images/syntax-highlighting.png)

This extension has simple syntax highlighting, with the following:

- [x] Keywords, such as `if` and `while`
- [x] Constants, such as `true` and `false`
- [x] Commands, such as `print` and `input`

### IntelliSense (auto-complete)

![Demo of IntelliSense](images/intellisense.gif)

- [x] Brackets are automatically completed
- [x] List of keywords and commands

### To come

- [ ] Semantic highlighting (variables)
- [ ] Error checking
- [ ] Debugging

## Extension Settings

To use Semantic highlighting in VSCode, turn it on in your Settings by searching `semantic` and turning Semantic Highlighting to `true`.

## Known Issues

- Sometimes IntelliSense is a bit slow to start, working on optimizing it as a low priority job
- > I can't see the highlighting!
  
  That's not my fault. Try a different theme (Dark+ is a good one) and go into your settings.
- > There is no highlighting on the variables/other stuff!
  
  Semantic highlighting has not been added yet and I don't want to do it using a regex.
  
  Please, please only make an issue if it's a Rosemary keyword/command that has not been added within a fortnight of being added. I have to juggle around my time too!

## Release Notes

### 0.0.1

First release of the extension.
Features include basic IntelliSense and syntax highlighting. More to come!

**Enjoy!**
