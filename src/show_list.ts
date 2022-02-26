import * as vscode from 'vscode';
import getDOI from './get_doi';

/**
 * Show title list.
 * @param titleList 
 */
function showList(titleList, authorList, venueList) {
    let items: vscode.QuickPickItem[] = [];

    for (let idx = 0; idx.toString() in titleList; idx++) {
        items.push({ 
            label: (idx + 1).toString(),
            description: titleList[idx],
            detail: authorList[idx] + " " + venueList[idx],
        });
    }

    vscode.window.showQuickPick(items).then(selection => {
        if (!selection) {
            return;
        }

        getDOI(titleList[parseInt(selection.label) - 1]);

    });
}

export default showList;
