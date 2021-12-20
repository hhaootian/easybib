import * as vscode from 'vscode';

/**
 * Write clipboard to bib file.
 */
function clip() {
    vscode.env.clipboard.readText().then(
        (clipboardContent) => {
            let workSpace = vscode.workspace.workspaceFolders;
            if (workSpace && workSpace[0]) {
                // currently hardcode bib filename
                let filePath = workSpace[0].uri.path + "/ref.bib";

                const fs = require('fs');
                fs.appendFileSync(filePath, `\n${clipboardContent}\n`);

                // pop up notice
                let title = clipboardContent.split(",")[0].split("{")[1];
                // no need for notice
                // vscode.window.showInformationMessage("added: " + title);

                let textEditor = vscode.window.activeTextEditor;
                if (textEditor !== undefined) {
                    let uri = textEditor.document.uri;
                    let edit = new vscode.WorkspaceEdit();

                    edit.insert(uri, textEditor.selection.active, title);
                    vscode.workspace.applyEdit(edit);
                }
            }
        }
    );
}

export default clip;
