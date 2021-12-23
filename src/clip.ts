import * as vscode from 'vscode';
import findDoi from "./FindDoi";
import pasteCursor from './PasteCursor';

/**
 *  citekey to bib file.
 */
function clip() {
    vscode.env.clipboard.readText().then(
        (clipboardContent) => {
            // async find DOI and paste to bib file
            findDoi(clipboardContent);

            let citeKey = clipboardContent.split(",")[0].split("{")[1];
            pasteCursor(citeKey);
        }
    );
}

export default clip;
