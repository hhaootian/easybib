import * as vscode from 'vscode';
import axios from "axios";

/**
 * Search DOI given BibTeX info.
 */
async function doi(clipboardContent: string) {
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

        // get title from clipboardContent
        let title = clipboardContent.split("title={")[1].split("}")[0];

        // crossref api address
        let crossref = "https://api.crossref.org/works?query.bibliographic=";
        let url = crossref + `"${title}"`;

        axios.get(url)
        .then(function (response) {
            let message = response.data['message']['items'][0];
            let doi = message['DOI'];

            // if it is preprint
            // try to use journal DOI instead
            if (message.hasOwnProperty("relation") && 
            message['relation'].hasOwnProperty("is-preprint-of")
            ) {
                doi = message['relation']['is-preprint-of']['0']['id'];
            }
    
            clipboardContent = clipboardContent.substring(
                0, clipboardContent.length - 2
            ) + `,\n  doi={${doi}}\n}`;
        })
        .catch(function () {
            // not add DOI
        })
        .then(() => {
            // write to file
            fs.appendFileSync(workPath + fileName, `\n${clipboardContent}\n`);
        });
    }
}

export default doi;
