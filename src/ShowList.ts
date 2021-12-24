import * as vscode from 'vscode';
import getDOI from './GetDOI';

/**
 * Show title list.
 * @param titleList 
 */
function showList(titleList) {
    let items: vscode.QuickPickItem[] = [];

    for (let idx = 1; idx.toString() in titleList; idx++) {
        items.push({ 
            label: idx.toString(),
            description: titleList[idx]
        });
    }

    vscode.window.showQuickPick(items).then(selection => {
        if (!selection) {
            return;
        }

        getDOI(titleList[parseInt(selection.label)]);

    });
}

export default showList;
