import * as vscode from 'vscode';

/**
 * Write clipboard to bib file.
 */
function clip() {
    vscode.env.clipboard.readText().then(
        (clipboardContent) => {
            let workSpace = vscode.workspace.workspaceFolders;
            if (workSpace && workSpace[0]) {
                let workPath = workSpace[0].uri.path + "/";
                let fileName = "";

                const fs = require('fs');
                fs.readdirSync(workPath).forEach((file: string) => {
                    if (file.substring(file.length - 3) === "bib") {
                        fileName = file;
                    }
                });

                // if no such bib file, create as ref.bib
                if (fileName === "") {
                    fileName = "ref.bib";
                }

                fs.appendFileSync(workPath + fileName, `\n${clipboardContent}\n`);

                // citekey for BibTeX
                let citeKey = clipboardContent.split(",")[0].split("{")[1];

                let textEditor = vscode.window.activeTextEditor;
                if (textEditor !== undefined) {
                    let uri = textEditor.document.uri;
                    let edit = new vscode.WorkspaceEdit();

                    edit.insert(uri, textEditor.selection.active, citeKey);
                    vscode.workspace.applyEdit(edit);
                }
            }
        }
    );
}

export default clip;
