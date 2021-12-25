import * as vscode from 'vscode';
import searchBox from './search_box';

export function activate(context: vscode.ExtensionContext) {
    let searchCommand = vscode.commands.registerCommand(
        "easybib.lookup", () => searchBox()
    );

    context.subscriptions.push(searchCommand);
}

export function deactivate() {}
