import * as vscode from 'vscode';
import clip from './clip';
import searchBox from './search';

export function activate(context: vscode.ExtensionContext) {
    let clipCommand = vscode.commands.registerCommand('autobib.clip', () => clip());
    let searchCommand = vscode.commands.registerCommand("autobib.search", () => searchBox());

    context.subscriptions.push(clipCommand);
    context.subscriptions.push(searchCommand);
}

export function deactivate() {}
