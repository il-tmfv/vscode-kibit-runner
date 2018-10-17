import * as vscode from 'vscode';
import { normalize } from 'path';
import { spawn } from 'child_process';

export default class KibitRunner {
  private output: string = "";
  private errColl: vscode.DiagnosticCollection = null;
  private statusBarItem: vscode.StatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);

  constructor() {
    this.errColl = vscode.languages.createDiagnosticCollection('KibitEvaluationErrors');
    this.statusBarItem.text = "Kibit is running";
  }

  public dispose() {
    this.statusBarItem.dispose();
  }

  public clear() {
    this.errColl.clear();
    this.output = "";
  }

  private parseOutput(output: string, editor: vscode.TextEditor) {
    const messages = output.split(/^$/gm).map(x => x.trim()).filter(x => x);
    vscode.window.showInformationMessage(`Kibit found ${messages.length} places to improve`);
    const suggestions = [];

    messages.forEach(message => {
      const match = (/:(\d+):/).exec(message);
      const line = parseInt(match[1]) - 1;
      if (isNaN(line)) {
        return;
      }
      const lineInEditor = editor.document.lineAt(line).text;
      const codeLength = lineInEditor.trim().length;
      const column = lineInEditor.search(/\S|$/);
      const suggestion = new vscode.Diagnostic(new vscode.Range(line, column, line, column + codeLength), message, vscode.DiagnosticSeverity.Warning);
      suggestions.push(suggestion);
    });

    this.errColl.set(editor.document.uri, suggestions);
  }

  public run(editor: vscode.TextEditor) {
    this.clear();
    this.statusBarItem.show();
    const fileName = editor.document.fileName;

    let output = "";
    let kibit = spawn("lein", ["kibit", fileName]);
    kibit.stdout.setEncoding("utf8");

    kibit.on("error", (error: { message, code }) => {
      vscode.window.showErrorMessage("Kibit error: " + error.message);
    });

    kibit.stdout.on("data", (data) => {
      if (data.length != 0) {
        output += data.toString();
      }
    });

    kibit.on("close", () => {
      this.parseOutput(output, editor);
      this.statusBarItem.hide();
    })
  }
}