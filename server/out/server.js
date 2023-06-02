"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("vscode-languageserver/node");
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = (0, node_1.createConnection)(node_1.ProposedFeatures.all);
// Create a simple text document manager.
const documents = new node_1.TextDocuments(vscode_languageserver_textdocument_1.TextDocument);
let hasConfigurationCapability = false;
let hasWorkspaceFolderCapability = false;
let hasDiagnosticRelatedInformationCapability = false;
connection.onInitialize((params) => {
    connection.console.log("Server is running!");
    const capabilities = params.capabilities;
    // Does the client support the `workspace/configuration` request?
    // If not, we fall back using global settings.
    hasConfigurationCapability = !!(capabilities.workspace && !!capabilities.workspace.configuration);
    hasWorkspaceFolderCapability = !!(capabilities.workspace && !!capabilities.workspace.workspaceFolders);
    hasDiagnosticRelatedInformationCapability = !!(capabilities.textDocument &&
        capabilities.textDocument.publishDiagnostics &&
        capabilities.textDocument.publishDiagnostics.relatedInformation);
    const result = {
        capabilities: {
            textDocumentSync: node_1.TextDocumentSyncKind.Incremental,
            // Tell the client that this server supports code completion.
            completionProvider: {
                resolveProvider: true
            }
        }
    };
    if (hasWorkspaceFolderCapability) {
        result.capabilities.workspace = {
            workspaceFolders: {
                supported: true
            }
        };
    }
    return result;
});
connection.onInitialized(() => {
    if (hasConfigurationCapability) {
        // Register for all configuration changes.
        connection.client.register(node_1.DidChangeConfigurationNotification.type, undefined);
    }
    if (hasWorkspaceFolderCapability) {
        connection.workspace.onDidChangeWorkspaceFolders(_event => {
            connection.console.log('Workspace folder change event received.');
        });
    }
});
// The global settings, used when the `workspace/configuration` request is not supported by the client.
// Please note that this is not the case when using this server with the client provided in this example
// but could happen with other clients.
const defaultSettings = { maxNumberOfProblems: 1000 };
let globalSettings = defaultSettings;
// Cache the settings of all open documents
const documentSettings = new Map();
connection.onDidChangeConfiguration(change => {
    if (hasConfigurationCapability) {
        // Reset all cached document settings
        documentSettings.clear();
    }
    else {
        globalSettings = ((change.settings.languageServerExample || defaultSettings));
    }
    // Revalidate all open text documents
    documents.all().forEach(validateTextDocument);
});
function getDocumentSettings(resource) {
    if (!hasConfigurationCapability) {
        return Promise.resolve(globalSettings);
    }
    let result = documentSettings.get(resource);
    if (!result) {
        result = connection.workspace.getConfiguration({
            scopeUri: resource,
            section: 'languageServerExample'
        });
        documentSettings.set(resource, result);
    }
    return result;
}
// Only keep settings for open documents
documents.onDidClose(e => {
    documentSettings.delete(e.document.uri);
});
// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent(change => {
    validateTextDocument(change.document);
});
async function validateTextDocument(textDocument) {
    // In this simple example we get the settings for every validate run.
    const settings = await getDocumentSettings(textDocument.uri);
    // The validator creates diagnostics for all uppercase words length 2 and more
    const text = textDocument.getText();
    let pattern = /\b(string|int|bool|float) =/g;
    let m;
    let problems = 0;
    const diagnostics = [];
    while ((m = pattern.exec(text)) && problems < settings.maxNumberOfProblems) {
        problems++;
        const diagnostic = {
            severity: node_1.DiagnosticSeverity.Error,
            range: {
                start: textDocument.positionAt(m.index),
                end: textDocument.positionAt(m.index + m[0].length)
            },
            message: `Expected an identifier`,
            source: 'rosemary'
        };
        diagnostics.push(diagnostic);
    }
    let pattern1 = /\b(if|loop|while|elif)({| {)/g;
    let m1;
    while ((m1 = pattern1.exec(text)) && problems < settings.maxNumberOfProblems) {
        problems++;
        const diagnostic = {
            severity: node_1.DiagnosticSeverity.Error,
            range: {
                start: textDocument.positionAt(m1.index),
                end: textDocument.positionAt(m1.index + m1[0].length)
            },
            message: `Expected a condition`,
            source: 'rosemary'
        };
        diagnostics.push(diagnostic);
    }
    let pattern2 = /\bfunc({| {)/g;
    let m2;
    while ((m2 = pattern2.exec(text)) && problems < settings.maxNumberOfProblems) {
        problems++;
        const diagnostic = {
            severity: node_1.DiagnosticSeverity.Error,
            range: {
                start: textDocument.positionAt(m2.index),
                end: textDocument.positionAt(m2.index + m2[0].length)
            },
            message: `Expected a name for the function`,
            source: 'rosemary'
        };
        diagnostics.push(diagnostic);
    }
    let pattern3 = /\b(goto|ret|input|print|inc|label)(?! \S)/g;
    let m3;
    while ((m3 = pattern3.exec(text)) && problems < settings.maxNumberOfProblems) {
        problems++;
        const diagnostic = {
            severity: node_1.DiagnosticSeverity.Error,
            range: {
                start: textDocument.positionAt(m3.index),
                end: textDocument.positionAt(m3.index + m3[0].length)
            },
            message: `Expected a value after ${m3[0]}`,
            source: 'rosemary'
        };
        diagnostics.push(diagnostic);
    }
    /* let pattern4 = /(?<!{)if/g;
    let m4: RegExpExecArray | null;
    while ((m4 = pattern4.exec(text)) && problems < settings.maxNumberOfProblems) {
        problems++;
        const diagnostic: Diagnostic = {
            severity: DiagnosticSeverity.Error,
            range: {
                start: textDocument.positionAt(m4.index),
                end: textDocument.positionAt(m4.index + m4[0].length)
            },
            message: `expected bracket after ${m4[0]}`,
            source: 'rosemary'
        };
        diagnostics.push(diagnostic);
    } */
    let pattern5 = /string [a-z]* = (?!")/g;
    let m5;
    while ((m5 = pattern5.exec(text)) && problems < settings.maxNumberOfProblems) {
        problems++;
        const diagnostic = {
            severity: node_1.DiagnosticSeverity.Error,
            range: {
                start: textDocument.positionAt(m5.index),
                end: textDocument.positionAt(m5.index + m5[0].length)
            },
            message: `Expected a string after =`,
            source: 'rosemary'
        };
        diagnostics.push(diagnostic);
    }
    let pattern6 = /int [a-z]* =(\s|\D)*$/g;
    let m6;
    while ((m6 = pattern6.exec(text)) && problems < settings.maxNumberOfProblems) {
        problems++;
        const diagnostic = {
            severity: node_1.DiagnosticSeverity.Error,
            range: {
                start: textDocument.positionAt(m6.index),
                end: textDocument.positionAt(m6.index + m6[0].length)
            },
            message: `Expected an int after =`,
            source: 'rosemary'
        };
        diagnostics.push(diagnostic);
    }
    let pattern7 = /bool [a-z]* =( |)(?!true|false)/g;
    let m7;
    while ((m7 = pattern7.exec(text)) && problems < settings.maxNumberOfProblems) {
        problems++;
        const diagnostic = {
            severity: node_1.DiagnosticSeverity.Error,
            range: {
                start: textDocument.positionAt(m7.index),
                end: textDocument.positionAt(m7.index + m7[0].length)
            },
            message: `Expected true or false after =`,
            source: 'rosemary'
        };
        diagnostics.push(diagnostic);
    }
    let pattern8 = /bool [a-z]* =( |)(?!true|false)/g;
    let m8;
    while ((m8 = pattern8.exec(text)) && problems < settings.maxNumberOfProblems) {
        problems++;
        const diagnostic = {
            severity: node_1.DiagnosticSeverity.Error,
            range: {
                start: textDocument.positionAt(m8.index),
                end: textDocument.positionAt(m8.index + m8[0].length)
            },
            message: `Unclosed quotation marks`,
            source: 'rosemary'
        };
        diagnostics.push(diagnostic);
    }
    let pattern9 = /extern(?! ")/g;
    let m9;
    while ((m9 = pattern9.exec(text)) && problems < settings.maxNumberOfProblems) {
        problems++;
        const diagnostic = {
            severity: node_1.DiagnosticSeverity.Error,
            range: {
                start: textDocument.positionAt(m9.index),
                end: textDocument.positionAt(m9.index + m9[0].length)
            },
            message: `Expected quotation marks after extern`,
            source: 'rosemary'
        };
        diagnostics.push(diagnostic);
    }
    let pattern10 = /^[^\"]*(\"[^\"]*\"[^\"]*)*(\")[^\"]*$/gm;
    let m10;
    while ((m10 = pattern10.exec(text)) && problems < settings.maxNumberOfProblems) {
        problems++;
        const diagnostic = {
            severity: node_1.DiagnosticSeverity.Error,
            range: {
                start: textDocument.positionAt(m10.index),
                end: textDocument.positionAt(m10.index + m10[0].length)
            },
            message: `Unended quotation marks or a multi-line string (not supported)`,
            source: 'rosemary'
        };
        diagnostics.push(diagnostic);
    }
    let pattern11 = /^[^\']*(\'[^\']*\'[^\']*)*(\')[^\']*$/gm;
    let m11;
    while ((m11 = pattern11.exec(text)) && problems < settings.maxNumberOfProblems) {
        problems++;
        const diagnostic = {
            severity: node_1.DiagnosticSeverity.Error,
            range: {
                start: textDocument.positionAt(m11.index),
                end: textDocument.positionAt(m11.index + m11[0].length)
            },
            message: `Unended quotation marks or a multi-line string (not supported)`,
            source: 'rosemary'
        };
        diagnostics.push(diagnostic);
    }
    let pattern12 = /(?<!int |bool |float |string )\S\s?=/g;
    let m12;
    while ((m12 = pattern12.exec(text)) && problems < settings.maxNumberOfProblems) {
        problems++;
        const diagnostic = {
            severity: node_1.DiagnosticSeverity.Error,
            range: {
                start: textDocument.positionAt(m12.index),
                end: textDocument.positionAt(m12.index + m12[0].length)
            },
            message: `No type of data specified`,
            source: 'rosemary'
        };
        if (hasDiagnosticRelatedInformationCapability) {
            diagnostic.relatedInformation = [
                {
                    location: {
                        uri: textDocument.uri,
                        range: Object.assign({}, diagnostic.range)
                    },
                    message: 'To change a variable, use `extern "<variable> = <new value>"`'
                }
            ];
        }
        diagnostics.push(diagnostic);
    }
    // Send the computed diagnostics to VSCode.
    connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
}
connection.onDidChangeWatchedFiles(_change => {
    // Monitored files have change in VSCode
    connection.console.log('We received an file change event');
});
// This handler provides the initial list of the completion items.
connection.onCompletion((_textDocumentPosition) => {
    // The pass parameter contains the position of the text document in
    // which code complete got requested. For the example we ignore this
    // info and always provide the same completion items.
    return [
        {
            label: 'if',
            kind: node_1.CompletionItemKind.Keyword,
            data: 1
        },
        {
            label: 'inc',
            kind: node_1.CompletionItemKind.Method,
            data: 2
        },
        {
            label: 'input',
            kind: node_1.CompletionItemKind.Method,
            data: 3
        },
        {
            label: 'int',
            kind: node_1.CompletionItemKind.Keyword,
            data: 4
        },
        {
            label: 'ints',
            kind: node_1.CompletionItemKind.Keyword,
            data: 5
        },
        {
            label: 'false',
            kind: node_1.CompletionItemKind.Keyword,
            data: 6
        },
        {
            label: 'float',
            kind: node_1.CompletionItemKind.Keyword,
            data: 7
        },
        {
            label: 'floats',
            kind: node_1.CompletionItemKind.Keyword,
            data: 8
        },
        {
            label: 'func',
            kind: node_1.CompletionItemKind.Keyword,
            data: 9
        },
        {
            label: 'while',
            kind: node_1.CompletionItemKind.Keyword,
            data: 10
        },
        {
            label: 'print',
            kind: node_1.CompletionItemKind.Method,
            data: 11
        },
        {
            label: 'string',
            kind: node_1.CompletionItemKind.Keyword,
            data: 12
        },
        {
            label: 'strings',
            kind: node_1.CompletionItemKind.Keyword,
            data: 13
        },
        {
            label: 'bool',
            kind: node_1.CompletionItemKind.Keyword,
            data: 14
        },
        {
            label: 'bools',
            kind: node_1.CompletionItemKind.Keyword,
            data: 15
        },
        {
            label: 'true',
            kind: node_1.CompletionItemKind.Keyword,
            data: 16
        },
        {
            label: 'elif',
            kind: node_1.CompletionItemKind.Keyword,
            data: 17
        },
        {
            label: 'else',
            kind: node_1.CompletionItemKind.Keyword,
            data: 18
        },
        {
            label: 'extern',
            kind: node_1.CompletionItemKind.Method,
            data: 19
        },
        {
            label: 'label',
            kind: node_1.CompletionItemKind.Method,
            data: 20
        },
        {
            label: 'loop',
            kind: node_1.CompletionItemKind.Keyword,
            data: 21
        },
        {
            label: 'ret',
            kind: node_1.CompletionItemKind.Method,
            data: 22
        },
        {
            label: 'goto',
            kind: node_1.CompletionItemKind.Method,
            data: 23
        },
    ];
});
// This handler resolves additional information for the item selected in
// the completion list.
connection.onCompletionResolve((item) => {
    if (item.data === 1) {
        item.detail = 'TypeScript details';
        item.documentation = 'TypeScript documentation';
    }
    else if (item.data === 2) {
        item.detail = 'JavaScript details';
        item.documentation = 'JavaScript documentation';
    }
    return item;
});
// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);
// Listen on the connection
connection.listen();
//# sourceMappingURL=server.js.map