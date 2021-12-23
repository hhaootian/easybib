import * as vscode from 'vscode';

function writeBib(bibtex) {
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

        // if no such bib file, create as ref.bib
        if (fileName === "") {
            fileName = "ref.bib";
        }

        fs.appendFileSync(workPath + fileName, `\n${bibtex}\n`);
    }
}

export default writeBib;
