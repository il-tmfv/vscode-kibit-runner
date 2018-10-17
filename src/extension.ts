'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import KibitRunner from './KibitRunner';

export function activate(context: vscode.ExtensionContext) {
    const kibitRunner = new KibitRunner();

    let runCommand = vscode.commands.registerCommand('vscode-kibit-runner.runKibit', () => {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
          return; // No open text editor
        }

        if (editor.document.languageId === "clojure") {
            kibitRunner.run(editor);
        }
    });

    let clearCommand = vscode.commands.registerCommand('vscode-kibit-runner.clear', () => {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
          return; // No open text editor
        }

        if (editor.document.languageId === "clojure") {
            kibitRunner.clear();
        }
    });

    context.subscriptions.push(runCommand);
    context.subscriptions.push(clearCommand);
    context.subscriptions.push(kibitRunner);
}

// this method is called when your extension is deactivated
export function deactivate() {
}