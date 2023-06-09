 /**
 * This is a VS Code extension that provides autocomplete suggestions for the Rosemary programming
 * language.
 * @param context - The extension context is a collection of utilities and services that an extension
 * can use during its lifecycle. It provides access to the extension's storage path, subscriptions, and
 * other resources. The context is passed to the extension's activate function when it is activated and
 * can be used to register commands, providers, and
 * @returns The code snippet does not have a return statement. It is an extension for Visual Studio
 * Code that registers completion item providers for the Rosemary language.
 */
/*
'use strict';
import * as vscode from 'vscode';
import * as path from 'path';

/* const tokenTypes = ['function', 'variable'];
const tokenModifiers = ['declaration'];
const legend = new vscode.SemanticTokensLegend(tokenTypes, tokenModifiers); */
/*
export function activate(context: vscode.ExtensionContext) {
	console.log("Hello. I am working!");

	const collection = vscode.languages.createDiagnosticCollection('test');
	if (vscode.window.activeTextEditor) {
		updateDiagnostics(vscode.window.activeTextEditor.document, collection);
	}
	context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(editor => {
		if (editor) {
			updateDiagnostics(editor.document, collection);
		}
	}));

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
/* 
	const letterI = vscode.languages.registerCompletionItemProvider(
		{ language: 'rosemary'},
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

				

				return [
					new vscode.CompletionItem('if', vscode.CompletionItemKind.Keyword),
					new vscode.CompletionItem('inc', vscode.CompletionItemKind.Method),
					new vscode.CompletionItem('input', vscode.CompletionItemKind.Method),
					new vscode.CompletionItem('int', vscode.CompletionItemKind.Keyword),
					new vscode.CompletionItem('ints', vscode.CompletionItemKind.Keyword),
				];
			}
		},
		'i'
	);
	const letterF = vscode.languages.registerCompletionItemProvider(
		{ language: 'rosemary' },
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

				

				return [
					new vscode.CompletionItem('false', vscode.CompletionItemKind.Keyword),
					new vscode.CompletionItem('float', vscode.CompletionItemKind.Keyword),
					new vscode.CompletionItem('floats', vscode.CompletionItemKind.Keyword),
					new vscode.CompletionItem('func', vscode.CompletionItemKind.Keyword),
				];
			}
		},
		'f'
	);
	const letterW = vscode.languages.registerCompletionItemProvider(
		{ language: 'rosemary' },
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

				

				return [
					new vscode.CompletionItem('while', vscode.CompletionItemKind.Keyword),
				];
			}
		},
		'w'
	);
	const letterP = vscode.languages.registerCompletionItemProvider(
		{ language: 'rosemary' },
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

				

				return [
					new vscode.CompletionItem('print', vscode.CompletionItemKind.Method),
				];
			}
		},
		'p'
	);
	const letterS = vscode.languages.registerCompletionItemProvider(
		{ language: 'rosemary' },
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

				

				return [
					new vscode.CompletionItem('string', vscode.CompletionItemKind.Keyword),
					new vscode.CompletionItem('strings', vscode.CompletionItemKind.Keyword),
				];
			}
		},
		's'
	);
	const letterB = vscode.languages.registerCompletionItemProvider(
		{ language: 'rosemary' },
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

				

				return [
					new vscode.CompletionItem('bool', vscode.CompletionItemKind.Keyword),
					new vscode.CompletionItem('bools', vscode.CompletionItemKind.Keyword),
				];
			}
		},
		'b'
	);
	const letterT = vscode.languages.registerCompletionItemProvider(
		{ language: 'rosemary' },
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

				

				return [
					new vscode.CompletionItem('true', vscode.CompletionItemKind.Keyword),
				];
			}
		},
		't'
	);
	const letterE = vscode.languages.registerCompletionItemProvider(
		{ language: 'rosemary' },
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
				return [
					new vscode.CompletionItem('elif', vscode.CompletionItemKind.Keyword),
					new vscode.CompletionItem('else', vscode.CompletionItemKind.Keyword),
					new vscode.CompletionItem('extern', vscode.CompletionItemKind.Method),
				];
			}
		},
		'e'
	);
	const letterL = vscode.languages.registerCompletionItemProvider(
		{ language: 'rosemary' },
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
				return [
					new vscode.CompletionItem('label', vscode.CompletionItemKind.Method),
					new vscode.CompletionItem('loop', vscode.CompletionItemKind.Keyword),
				];
			}
		},
		'l'
	);
	const letterR = vscode.languages.registerCompletionItemProvider(
		{ language: 'rosemary' },
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
				return [
					new vscode.CompletionItem('ret', vscode.CompletionItemKind.Method),
				];
			}
		},
		'r'
	);
	const letterG = vscode.languages.registerCompletionItemProvider(
		{ language: 'rosemary' },
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
				return [
					new vscode.CompletionItem('goto', vscode.CompletionItemKind.Method),
				];
			}
		},
		'g'
	);
	

	context.subscriptions.push(letterB, letterE, letterF, letterI, letterP, letterS, letterT, letterW, letterL, letterR, letterG);
}

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

const selector = { language: 'rosemary' }; // register for all Java documents from the local file system

vscode.languages.registerDocumentSemanticTokensProvider(selector, provider, legend); */
/* 
function updateDiagnostics(document: vscode.TextDocument, collection: vscode.DiagnosticCollection): void {
	if (document && (path.extname(document.uri.fsPath) === '.rsmy' || path.extname(document.uri.fsPath) === '.rh')) {
		// const linePrefix = document.lineAt(position).text.substr(0, position.character);

		collection.set(document.uri, [{
			code: '',
			message: 'cannot assign twice to immutable variable `x`',
			range: new vscode.Range(new vscode.Position(3, 4), new vscode.Position(3, 10)),
			severity: vscode.DiagnosticSeverity.Error,
			source: '',
			relatedInformation: [
				new vscode.DiagnosticRelatedInformation(new vscode.Location(document.uri, new vscode.Range(new vscode.Position(1, 8), new vscode.Position(1, 9))), 'first assignment to `x`')
			]
		}]);
	} else {
		collection.clear();
	}
}

// This method is called when your extension is deactivated
export function deactivate() {
	// Noop
} */


import * as path from 'path';
import { workspace, ExtensionContext } from 'vscode';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
	// The server is implemented in node
	const serverModule = context.asAbsolutePath(
		path.join('server', 'out', 'server.js')
	);

	// If the extension is launched in debug mode then the debug server options are used
	// Otherwise the run options are used
	const serverOptions: ServerOptions = {
		run: { module: serverModule, transport: TransportKind.ipc },
		debug: {
			module: serverModule,
			transport: TransportKind.ipc,
		}
	};

	// Options to control the language client
	const clientOptions: LanguageClientOptions = {
		// Register the server for plain text documents
		documentSelector: [{ language: 'rosemary' }],
		synchronize: {
			// Notify the server about file changes to '.clientrc files contained in the workspace
			fileEvents: workspace.createFileSystemWatcher('**/.clientrc')
		}
	};

	// Create the language client and start the client.
	client = new LanguageClient(
		'rosemary',
		'Rosemary',
		serverOptions,
		clientOptions
	);

	// Start the client. This will also launch the server
	client.start();
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}