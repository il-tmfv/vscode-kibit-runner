'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import KibitRunner from './KibitRunner';

export function activate(context: vscode.ExtensionContext) {
    const kibitRunner = new KibitRunner();

    function runAndReplaceCommand() {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
          return; // No open text editor
        }

        if (editor.document.languageId === "clojure") {
            kibitRunner.run(editor, true);
        }
    }

    function runCommand() {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
          return; // No open text editor
        }

        if (editor.document.languageId === "clojure") {
            kibitRunner.run(editor);
        }
    }

    function clearCommand() {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
          return; // No open text editor
        }

        if (editor.document.languageId === "clojure") {
            kibitRunner.clear();
        }
    }

    context.subscriptions.push(vscode.commands.registerCommand('vscode-kibit-runner.runKibit', runCommand));
    context.subscriptions.push(vscode.commands.registerCommand('vscode-kibit-runner.runAndReplaceKibit', runAndReplaceCommand));
    context.subscriptions.push(vscode.commands.registerCommand('vscode-kibit-runner.clear', clearCommand));
    context.subscriptions.push(kibitRunner);
}

// this method is called when your extension is deactivated
export function deactivate() {
}