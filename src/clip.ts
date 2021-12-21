import * as vscode from 'vscode';
import doi from "./doi";

/**
 * Paste citekey to bib file.
 */
function clip() {
    vscode.env.clipboard.readText().then(
        (clipboardContent) => {
            // async find DOI and paste to bib file
            doi(clipboardContent);

            let citeKey = clipboardContent.split(",")[0].split("{")[1];

            let textEditor = vscode.window.activeTextEditor;
            if (textEditor !== undefined) {
                let uri = textEditor.document.uri;
                let edit = new vscode.WorkspaceEdit();

                // insert to current cursor position
                edit.insert(uri, textEditor.selection.active, citeKey);
                vscode.workspace.applyEdit(edit);
            }
        }
    );
}

export default clip;
