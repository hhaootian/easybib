import * as vscode from 'vscode';
import showList from "./show_list";
import * as config from './config';

/**
 * Do web scraping with search query.
 * @param searchQuery 
 */
function webScraping(searchQuery) {
    const https = require('https');
    var titleList = new Map();

    let fields = getFields();
    if (fields === ""){
        return;
    }

    var options = {
        host: 'api.semanticscholar.org',
        path: `/graph/v1/paper/search?query=${searchQuery}` + 
                  `&fields=${fields}&limit=${config.getEntryLimit()}`,
        method: 'GET'
    };

    var request = https.request(options, function(response) {
        response.setEncoding('utf8');
        let htmls = "";

        response.on('data', function (chunk) {
            htmls += chunk;
        });

        response.on('end', function () {
            let exp = '"title": ".*?"';
            const regexp = new RegExp(exp, 'g');
            const matches = htmls.matchAll(regexp);
            let idx = 1;

            for (const match of matches) {
                let htmlPiece = match[0];
                let splits = htmlPiece.split('\"');
                var title = splits[splits.length - 2];
                titleList[idx] = title.valueOf();
                idx ++;
            }

            showList(titleList);

        });
    });

    request.end();

};

/**
 * Get search fields.
 * @returns 
 */
function getFields() {
    let fields = "";
    if (config.getTitleField()) {
        fields += "title";
    } else {
        vscode.window.showWarningMessage(
            "It is suggested to include the title field."
        );
    }

    if (config.getAuthorField()) {
        if (fields !== "") {
            fields += ",";
        }
        fields += "authors";
    }

    if (config.getAbstractField()) {
        if (fields !== "") {
            fields += ",";
        }
        fields += "abstract";
    }

    if (config.getYearField()) {
        if (fields !== "") {
            fields += ",";
        }
        fields += "year";
    }

    if (fields === "") {
        vscode.window.showErrorMessage(
            "Empty search field. Please check config!"
        );
    }

    return fields;
}

export default webScraping;
