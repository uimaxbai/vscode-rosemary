"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
/* const tokenTypes = ['function', 'variable'];
const tokenModifiers = ['declaration'];
const legend = new vscode.SemanticTokensLegend(tokenTypes, tokenModifiers); */
function activate(context) {
    /* const provider1 = vscode.languages.registerCompletionItemProvider('plaintext', {

        provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {

            // a simple completion item which inserts `Hello World!`
            // const simpleCompletion = new vscode.CompletionItem('Hello World!');

            // a completion item that inserts its text as snippet,
            // the `insertText`-property is a `SnippetString` which will be
            // honored by the editor.
            // const snippetCompletion = new vscode.CompletionItem('if');
            // snippetCompletion.insertText = new vscode.SnippetString('if ');
            // const docs: any = new vscode.MarkdownString("Inserts a snippet that lets you select [link](x.ts).");
            // snippetCompletion.documentation = docs;
            // docs.baseUri = vscode.Uri.parse('http://example.com/a/b/c/');

            // a completion item that can be accepted by a commit character,
            // the `commitCharacters`-property is set which means that the completion will
            // be inserted and then the character will be typed.
            // const commitCharacterCompletion = new vscode.CompletionItem('console');
            // commitCharacterCompletion.commitCharacters = ['.'];
            // commitCharacterCompletion.documentation = new vscode.MarkdownString('Press `.` to get `console.`');

            // a completion item that retriggers IntelliSense when being accepted,
            // the `command`-property is set which the editor will execute after
            // completion has been inserted. Also, the `insertText` is set so that
            // a space is inserted after `new`
            const ifCommand = new vscode.CompletionItem('if');
            ifCommand.kind = vscode.CompletionItemKind.Keyword;
            ifCommand.insertText = 'if ';
            ifCommand.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };

            // return all completion items as array
            return [
                ifCommand
            ];
        }
    }); */
    const letterI = vscode.languages.registerCompletionItemProvider({ language: 'rosemary', scheme: 'file' }, {
        provideCompletionItems(document, position) {
            return [
                new vscode.CompletionItem('if', vscode.CompletionItemKind.Keyword),
                new vscode.CompletionItem('inc', vscode.CompletionItemKind.Method),
                new vscode.CompletionItem('input', vscode.CompletionItemKind.Method),
                new vscode.CompletionItem('int', vscode.CompletionItemKind.Keyword),
                new vscode.CompletionItem('ints', vscode.CompletionItemKind.Keyword),
            ];
        }
    }, 'i' // triggered whenever a '.' is being typed
    );
    const letterF = vscode.languages.registerCompletionItemProvider({ language: 'rosemary', scheme: 'file' }, {
        provideCompletionItems(document, position) {
            return [
                new vscode.CompletionItem('false', vscode.CompletionItemKind.Keyword),
                new vscode.CompletionItem('float', vscode.CompletionItemKind.Keyword),
                new vscode.CompletionItem('floats', vscode.CompletionItemKind.Keyword),
                new vscode.CompletionItem('func', vscode.CompletionItemKind.Keyword),
            ];
        }
    }, 'f' // triggered whenever a '.' is being typed
    );
    const letterW = vscode.languages.registerCompletionItemProvider({ language: 'rosemary', scheme: 'file' }, {
        provideCompletionItems(document, position) {
            return [
                new vscode.CompletionItem('while', vscode.CompletionItemKind.Keyword),
            ];
        }
    }, 'w' // triggered whenever a '.' is being typed
    );
    const letterP = vscode.languages.registerCompletionItemProvider({ language: 'rosemary', scheme: 'file' }, {
        provideCompletionItems(document, position) {
            return [
                new vscode.CompletionItem('print', vscode.CompletionItemKind.Method),
            ];
        }
    }, 'p' // triggered whenever a '.' is being typed
    );
    const letterS = vscode.languages.registerCompletionItemProvider({ language: 'rosemary', scheme: 'file' }, {
        provideCompletionItems(document, position) {
            return [
                new vscode.CompletionItem('string', vscode.CompletionItemKind.Keyword),
                new vscode.CompletionItem('strings', vscode.CompletionItemKind.Keyword),
            ];
        }
    }, 's' // triggered whenever a '.' is being typed
    );
    const letterB = vscode.languages.registerCompletionItemProvider({ language: 'rosemary', scheme: 'file' }, {
        provideCompletionItems(document, position) {
            return [
                new vscode.CompletionItem('bool', vscode.CompletionItemKind.Keyword),
                new vscode.CompletionItem('bools', vscode.CompletionItemKind.Keyword),
            ];
        }
    }, 'b' // triggered whenever a '.' is being typed
    );
    const letterT = vscode.languages.registerCompletionItemProvider({ language: 'rosemary', scheme: 'file' }, {
        provideCompletionItems(document, position) {
            return [
                new vscode.CompletionItem('true', vscode.CompletionItemKind.Keyword),
            ];
        }
    }, 't' // triggered whenever a '.' is being typed
    );
    const letterE = vscode.languages.registerCompletionItemProvider({ language: 'rosemary', scheme: 'file' }, {
        provideCompletionItems(document, position) {
            return [
                new vscode.CompletionItem('elif', vscode.CompletionItemKind.Keyword),
                new vscode.CompletionItem('else', vscode.CompletionItemKind.Keyword),
                new vscode.CompletionItem('extern', vscode.CompletionItemKind.Method),
            ];
        }
    }, 'e' // triggered whenever a '.' is being typed
    );
    const letterL = vscode.languages.registerCompletionItemProvider({ language: 'rosemary', scheme: 'file' }, {
        provideCompletionItems(document, position) {
            return [
                new vscode.CompletionItem('label', vscode.CompletionItemKind.Method),
                new vscode.CompletionItem('loop', vscode.CompletionItemKind.Keyword),
            ];
        }
    }, 'l' // triggered whenever a '.' is being typed
    );
    const letterR = vscode.languages.registerCompletionItemProvider({ language: 'rosemary', scheme: 'file' }, {
        provideCompletionItems(document, position) {
            return [
                new vscode.CompletionItem('ret', vscode.CompletionItemKind.Method),
            ];
        }
    }, 'r' // triggered whenever a '.' is being typed
    );
    const letterG = vscode.languages.registerCompletionItemProvider({ language: 'rosemary', scheme: 'file' }, {
        provideCompletionItems(document, position) {
            return [
                new vscode.CompletionItem('goto', vscode.CompletionItemKind.Method),
            ];
        }
    }, 'g' // triggered whenever a '.' is being typed
    );
    context.subscriptions.push(letterB, letterE, letterF, letterI, letterP, letterS, letterT, letterW, letterL, letterR, letterG);
}
exports.activate = activate;
/* const provider: vscode.DocumentSemanticTokensProvider = {
    provideDocumentSemanticTokens(
        document: vscode.TextDocument
    ): vscode.ProviderResult<vscode.SemanticTokens> {
        // analyze the document and return semantic tokens

        const tokensBuilder = new vscode.SemanticTokensBuilder(legend);
        // on line 1, characters 1-5 are a class declaration
        tokensBuilder.push(
            new vscode.Range(new vscode.Position(1, 1), new vscode.Position(1, 5)),
            'class',
            ['declaration']
        );
        return tokensBuilder.build();
    }
};

const selector = { language: 'rosemary', scheme: 'file' }; // register for all Java documents from the local file system

vscode.languages.registerDocumentSemanticTokensProvider(selector, provider, legend); */ 
//# sourceMappingURL=extension.js.map