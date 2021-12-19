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
                vscode.window.showInformationMessage("added: " + title);
            }
        }
    );
}

export default clip;
