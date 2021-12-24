import * as vscode from 'vscode';

/**
 * Write BibTeX to local bib file.
 * @param bibtex 
 */
function writeBib(bibtex: string) {
    let workSpace = vscode.workspace.workspaceFolders;

    if (workSpace && workSpace[0]) {
        let workPath = workSpace[0].uri.path + "/";
        let fileName = "";

        const fs = require('fs');
        // search for all files end with bib
        fs.readdirSync(workPath).forEach((file: string) => {
            if (file.substring(file.length - 3) === "bib") {
                fileName = file;
            }
        });

        // if no bib file, create one as ref.bib
        if (fileName === "") {
            fileName = "ref.bib";
        }

        fs.appendFileSync(workPath + fileName, `\n${bibtex}\n`);
    }
}

export default writeBib;
