import * as vscode from 'vscode';

/**
 * Paste to cursor.
 */
function pasteCursor(text: string) {
    let textEditor = vscode.window.activeTextEditor;
    if (textEditor !== undefined) {
        let uri = textEditor.document.uri;
        let edit = new vscode.WorkspaceEdit();

        // insert to current cursor position
        edit.insert(uri, textEditor.selection.active, text);
        vscode.workspace.applyEdit(edit);
    }
}

export default pasteCursor;
