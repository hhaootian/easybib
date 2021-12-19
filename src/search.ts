import * as vscode from 'vscode';

/**
 * Search on Google Scholar.
 */
async function searchBox() {
    var searchQuery = await vscode.window.showInputBox({
        placeHolder: "Search query",
        prompt: "Search on Google Scholar"
    });

    /**
     * Maybe this is not necessary.
    if (searchQuery === '') {
        vscode.window.showErrorMessage('Error: empty search query!');
    }
    */

    if (searchQuery !== undefined) {
        searchQuery = searchQuery.replace(/\s+/g, "+");
        var searchUrl = `https://scholar.google.com/scholar?&q=${searchQuery}`;
        vscode.env.openExternal(vscode.Uri.parse(searchUrl));		
    }
}

export default searchBox;
