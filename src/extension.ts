import * as vscode from 'vscode';
import searchBox from './SearchBox';

export function activate(context: vscode.ExtensionContext) {
    let searchCommand = vscode.commands.registerCommand(
        "easybib.search", () => searchBox()
    );

    context.subscriptions.push(searchCommand);
}

export function deactivate() {}
