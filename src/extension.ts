import * as vscode from 'vscode';
import clip from './clip';
import searchBox from './SearchBox';

export function activate(context: vscode.ExtensionContext) {
    let clipCommand = vscode.commands.registerCommand('easybib.clip', () => clip());
    let searchCommand = vscode.commands.registerCommand("easybib.search", () => searchBox());

    context.subscriptions.push(clipCommand);
    context.subscriptions.push(searchCommand);
}

export function deactivate() {}
